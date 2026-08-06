import { getCurrentYear } from '@/lib/utils';

export default function PageFooter() {
  return (
    <footer className="w-full mb-1 p-3 text-center">
      <p>© {getCurrentYear()} MoxieImpact. All Rights Reserved.</p>
    </footer>
  );
}
