export default function VideoSection({ className = '' }: { className?: string }) {
  return (
    <section className={className}>
      <h2 className="text-2xl font-semibold mb-4">Watch How Moxie Works</h2>
      <iframe
        className="w-full"
        src="https://player.vimeo.com/video/1072654894?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
        allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
        title="Moxie"
      ></iframe>
    </section>
  );
}
