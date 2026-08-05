import { Challenge } from '@/config/challenges';
import { Card, CardContent } from '../ui/card';

export default function ProgressSection({
  completed,
  shown,
  className = '',
}: {
  completed: number;
  shown: Challenge[];
  className?: string;
}) {
  return (
    <section className={className}>
      <Card className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20">
        <CardContent>
          <p className="text-center text-white text-sm">
            <span className="text-2xl font-bold text-blue-400">
              {completed}
            </span>
            <span className="text-gray-400">
              {' '}
              / {shown.length} completed today
            </span>
          </p>
          {completed === shown.length && shown.length > 0 && (
            <p className="text-center text-green-400 text-xs mt-2">
              That&apos;s everything for today. Well done. 🎉
            </p>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
