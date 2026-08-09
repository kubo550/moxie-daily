#!/usr/bin/env node
// Compresses raw video exports for the Fuel feed and drops them into
// public/video/. See --help for usage.

import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { pipeline } from 'node:stream/promises';
import { Readable } from 'node:stream';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, '..');
const BIN_DIR = path.join(__dirname, '.bin');
const DEFAULT_OUT = path.join(PROJECT_ROOT, 'public', 'video');
const DEFAULT_CONFIG = path.join(
  PROJECT_ROOT,
  'src',
  'config',
  'fuelVideos.ts'
);
const VIDEO_EXTENSIONS = new Set([
  '.mp4',
  '.mov',
  '.m4v',
  '.avi',
  '.mkv',
  '.webm',
]);

function printHelp() {
  console.log(`
Compress raw video exports for the Fuel feed.

Usage:
  npm run compress-videos -- <input-folder> [options]
  ./scripts/compress-videos.js <input-folder> [options]

Options:
  --out <dir>           Output folder (default: public/video)
  --config <file>       fuelVideos.ts to update (default: src/config/fuelVideos.ts)
  --width <px>          Target width, height scales to match (default: 720)
  --crf <n>             x264 quality, lower = larger/better (default: 24)
  --preset <name>       x264 preset (default: slow)
  --audio-bitrate <k>   AAC audio bitrate (default: 96k)
  --force               Re-convert even if the output file already exists
  --no-config           Don't touch fuelVideos.ts
  --ffmpeg <path>       Use this ffmpeg binary instead of auto-downloading
  -h, --help             Show this help

ffmpeg is resolved in this order: --ffmpeg flag -> scripts/.bin/ffmpeg (cached)
-> ffmpeg on your PATH -> downloaded automatically from an official static
build for your platform and cached in scripts/.bin/ for next time.
`);
}

function parseArgs(argv) {
  const opts = {
    input: null,
    out: DEFAULT_OUT,
    config: DEFAULT_CONFIG,
    width: 720,
    crf: 24,
    preset: 'slow',
    audioBitrate: '96k',
    force: false,
    updateConfig: true,
    ffmpegPath: null,
  };

  const args = [...argv];
  while (args.length) {
    const arg = args.shift();
    switch (arg) {
      case '-h':
      case '--help':
        printHelp();
        process.exit(0);
        break;
      case '--out':
        opts.out = path.resolve(args.shift() ?? '');
        break;
      case '--config':
        opts.config = path.resolve(args.shift() ?? '');
        break;
      case '--width':
        opts.width = Number(args.shift());
        break;
      case '--crf':
        opts.crf = Number(args.shift());
        break;
      case '--preset':
        opts.preset = args.shift();
        break;
      case '--audio-bitrate':
        opts.audioBitrate = args.shift();
        break;
      case '--force':
        opts.force = true;
        break;
      case '--no-config':
        opts.updateConfig = false;
        break;
      case '--ffmpeg':
        opts.ffmpegPath = path.resolve(args.shift() ?? '');
        break;
      default:
        if (arg.startsWith('--')) {
          console.error(`Unknown flag: ${arg}`);
          process.exit(1);
        }
        if (opts.input) {
          console.error(`Unexpected extra argument: ${arg}`);
          process.exit(1);
        }
        opts.input = path.resolve(arg);
    }
  }

  if (!opts.input) {
    printHelp();
    process.exit(1);
  }
  if (!Number.isFinite(opts.width) || !Number.isFinite(opts.crf)) {
    console.error('--width and --crf must be numbers');
    process.exit(1);
  }

  return opts;
}

function defaultRateCap(width) {
  if (width >= 1080) return { maxrate: '5M', bufsize: '10M' };
  if (width >= 720) return { maxrate: '3M', bufsize: '6M' };
  return { maxrate: '1.5M', bufsize: '3M' };
}

function findVideoFiles(dir) {
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter(
      (e) =>
        e.isFile() && VIDEO_EXTENSIONS.has(path.extname(e.name).toLowerCase())
    )
    .map((e) => e.name)
    .sort();
}

function formatMB(bytes) {
  return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
}

// Output files are served as URLs (/video/<name>), so spaces and characters
// like # or ? can't survive - they'd truncate or mangle the path.
function sanitizeFilename(base) {
  return base
    .replace(/[^a-zA-Z0-9._-]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// --- ffmpeg binary resolution -------------------------------------------

function findOnPath() {
  const cmd = process.platform === 'win32' ? 'where' : 'which';
  const result = spawnSync(cmd, ['ffmpeg'], { encoding: 'utf8' });
  if (result.status === 0) {
    return result.stdout.split(/\r?\n/).find(Boolean) ?? null;
  }
  return null;
}

function cachedBinaryPath() {
  return path.join(
    BIN_DIR,
    process.platform === 'win32' ? 'ffmpeg.exe' : 'ffmpeg'
  );
}

function resolveFfmpeg() {
  const cached = cachedBinaryPath();
  if (fs.existsSync(cached)) return cached;
  return findOnPath();
}

function verifyFfmpeg(ffmpegPath) {
  const result = spawnSync(ffmpegPath, ['-version'], { stdio: 'ignore' });
  if (result.error || result.status !== 0) {
    const rosettaHint =
      process.platform === 'darwin' && process.arch === 'arm64'
        ? '\nOn Apple Silicon this build needs Rosetta 2: run `softwareupdate --install-rosetta`,' +
          '\nor `brew install ffmpeg` and pass --ffmpeg "$(which ffmpeg)".'
        : '\nInstall ffmpeg manually and pass --ffmpeg <path>.';
    throw new Error(`ffmpeg binary at ${ffmpegPath} won't run.${rosettaHint}`);
  }
}

async function downloadFile(url, destPath) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Download failed (${res.status}): ${url}`);
  await pipeline(Readable.fromWeb(res.body), fs.createWriteStream(destPath));
}

function run(cmd, args) {
  const result = spawnSync(cmd, args, { stdio: 'inherit' });
  if (result.error || result.status !== 0) {
    throw new Error(`${cmd} ${args.join(' ')} failed`);
  }
}

function findFileRecursive(dir, filename) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      const found = findFileRecursive(full, filename);
      if (found) return found;
    } else if (entry.name.toLowerCase() === filename.toLowerCase()) {
      return full;
    }
  }
  return null;
}

// Static builds linked from ffmpeg.org's own "Download" page - not
// third-party mirrors. macOS builds are x86_64 only; they run fine under
// Rosetta 2 on Apple Silicon (verifyFfmpeg() below catches it if Rosetta is
// missing and tells you how to fix it).
async function downloadFfmpeg() {
  fs.mkdirSync(BIN_DIR, { recursive: true });
  const platform = process.platform;
  const arch = process.arch;

  if (platform === 'darwin') {
    console.log('Downloading ffmpeg for macOS (evermeet.cx)...');
    const info = await (
      await fetch('https://evermeet.cx/ffmpeg/info/ffmpeg/release')
    ).json();
    const zipPath = path.join(BIN_DIR, 'ffmpeg.zip');
    await downloadFile(info.download.zip.url, zipPath);
    run('unzip', ['-o', zipPath, '-d', BIN_DIR]);
    fs.rmSync(zipPath);
  } else if (platform === 'linux') {
    const archName = arch === 'arm64' ? 'arm64' : 'amd64';
    console.log(
      `Downloading ffmpeg for linux/${archName} (johnvansickle.com)...`
    );
    const tarUrl = `https://johnvansickle.com/ffmpeg/releases/ffmpeg-release-${archName}-static.tar.xz`;
    const tarPath = path.join(BIN_DIR, 'ffmpeg.tar.xz');
    await downloadFile(tarUrl, tarPath);
    run('tar', ['-xJf', tarPath, '-C', BIN_DIR, '--strip-components=1']);
    fs.rmSync(tarPath);
  } else if (platform === 'win32') {
    console.log('Downloading ffmpeg for Windows (gyan.dev)...');
    const zipUrl =
      'https://www.gyan.dev/ffmpeg/builds/ffmpeg-release-essentials.zip';
    const zipPath = path.join(BIN_DIR, 'ffmpeg.zip');
    await downloadFile(zipUrl, zipPath);
    run('tar', ['-xf', zipPath, '-C', BIN_DIR]);
    const nested = findFileRecursive(BIN_DIR, 'ffmpeg.exe');
    if (!nested)
      throw new Error(
        'Could not find ffmpeg.exe inside the downloaded archive.'
      );
    fs.copyFileSync(nested, cachedBinaryPath());
    fs.rmSync(zipPath);
  } else {
    throw new Error(
      `Unsupported platform: ${platform}. Install ffmpeg manually and pass --ffmpeg <path>.`
    );
  }

  const binaryPath = cachedBinaryPath();
  fs.chmodSync(binaryPath, 0o755);
  console.log(`ffmpeg cached at ${path.relative(PROJECT_ROOT, binaryPath)}\n`);
  return binaryPath;
}

// --- fuelVideos.ts config update -----------------------------------------

function toId(filename) {
  const base = filename.replace(/\.[^.]+$/, '');
  return base
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function updateConfig(configPath, convertedFiles) {
  if (!fs.existsSync(configPath)) {
    console.warn(
      `\nConfig file not found at ${configPath}, skipping config update.`
    );
    return;
  }

  const content = fs.readFileSync(configPath, 'utf8');
  const existingUrls = new Set(
    [...content.matchAll(/url:\s*['"]([^'"]+)['"]/g)].map((m) => m[1])
  );

  const newEntries = convertedFiles
    .map((file) => ({ file, url: `/video/${file}` }))
    .filter(({ url }) => !existingUrls.has(url))
    .map(
      ({ file, url }) =>
        `  { id: '${toId(file)}', source: { kind: 'file', url: '${url}' } },`
    );

  if (newEntries.length === 0) return;

  const arrayRegex =
    /(export const FUEL_VIDEOS: FuelVideo\[\] = \[)([\s\S]*?)(\n\];)/;
  if (!arrayRegex.test(content)) {
    console.warn(
      `\nCould not find the FUEL_VIDEOS array in ${configPath}, skipping config update.`
    );
    return;
  }

  const updated = content.replace(
    arrayRegex,
    (_, head, body, tail) => `${head}${body}\n${newEntries.join('\n')}${tail}`
  );
  fs.writeFileSync(configPath, updated);
  console.log(
    `\nAdded ${newEntries.length} entr${newEntries.length === 1 ? 'y' : 'ies'} to ${path.relative(PROJECT_ROOT, configPath)}`
  );
  console.log(
    'Run `npm run lint:fix` and fill in caption/type for each new clip.'
  );
}

// --- main ------------------------------------------------------------------

async function main() {
  const opts = parseArgs(process.argv.slice(2));

  if (!fs.existsSync(opts.input) || !fs.statSync(opts.input).isDirectory()) {
    console.error(`Input folder not found: ${opts.input}`);
    process.exit(1);
  }

  const files = findVideoFiles(opts.input);
  if (files.length === 0) {
    console.error(`No video files found in ${opts.input}`);
    process.exit(1);
  }

  fs.mkdirSync(opts.out, { recursive: true });

  const ffmpegPath =
    opts.ffmpegPath || resolveFfmpeg() || (await downloadFfmpeg());
  verifyFfmpeg(ffmpegPath);
  console.log(`Using ffmpeg: ${ffmpegPath}`);
  console.log(`Converting ${files.length} file(s) from ${opts.input}\n`);

  const { maxrate, bufsize } = defaultRateCap(opts.width);
  const results = [];

  for (const file of files) {
    const inputPath = path.join(opts.input, file);
    const outName = `${sanitizeFilename(path.basename(file, path.extname(file)))}.mp4`;
    const outputPath = path.join(opts.out, outName);

    if (fs.existsSync(outputPath) && !opts.force) {
      console.log(
        `- ${outName}: already exists, skipping (use --force to redo)`
      );
      results.push({ file: outName, status: 'skipped' });
      continue;
    }

    console.log(`- ${file} -> ${outName}`);
    const beforeBytes = fs.statSync(inputPath).size;
    const args = [
      '-y',
      '-i',
      inputPath,
      '-vf',
      `scale=${opts.width}:-2`,
      '-c:v',
      'libx264',
      '-preset',
      opts.preset,
      '-crf',
      String(opts.crf),
      '-maxrate',
      maxrate,
      '-bufsize',
      bufsize,
      '-c:a',
      'aac',
      '-b:a',
      opts.audioBitrate,
      '-movflags',
      '+faststart',
      '-hide_banner',
      '-loglevel',
      'error',
      '-stats',
      outputPath,
    ];
    const result = spawnSync(ffmpegPath, args, { stdio: 'inherit' });

    if (result.error || result.status !== 0) {
      console.error(
        `  failed: ${result.error?.message ?? `exit code ${result.status}`}`
      );
      results.push({ file: outName, status: 'failed' });
      continue;
    }

    const afterBytes = fs.statSync(outputPath).size;
    const reduction = 100 * (1 - afterBytes / beforeBytes);
    console.log(
      `  ${formatMB(beforeBytes)} -> ${formatMB(afterBytes)} (-${reduction.toFixed(0)}%)`
    );
    results.push({
      file: outName,
      status: 'converted',
      beforeBytes,
      afterBytes,
    });
  }

  console.log('\nSummary:');
  for (const r of results) {
    if (r.status === 'converted') {
      console.log(
        `  ${r.file}: ${formatMB(r.beforeBytes)} -> ${formatMB(r.afterBytes)}`
      );
    } else {
      console.log(`  ${r.file}: ${r.status}`);
    }
  }

  if (opts.updateConfig) {
    const candidates = results
      .filter((r) => r.status !== 'failed')
      .map((r) => r.file);
    if (candidates.length > 0) updateConfig(opts.config, candidates);
  }

  if (results.some((r) => r.status === 'failed')) {
    process.exitCode = 1;
  }
}

main().catch((err) => {
  console.error(err.message ?? err);
  process.exit(1);
});
