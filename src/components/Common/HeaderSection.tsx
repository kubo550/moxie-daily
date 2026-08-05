import { cn } from '@/lib/utils';

export default function HeaderSection({
  className,
  title,
  desc,
}: {
  className?: string;
  title: string;
  desc?: string;
}) {
  return (
    <section className={cn(className, 'text-left')}>
      <h1 className="text-3xl md:text-4xl font-bold mb-2 text-white">
        {title}
      </h1>
      {desc && <p className="text-gray-400 text-sm mb-6">{desc}</p>}
    </section>
  );
}
