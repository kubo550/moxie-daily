import { messages } from '@/config/about';
import { cn } from '@/lib/utils';

export default function MessagesSection({ className = '' }: { className?: string }) {
  return (
    <section
      className={cn(
        'max-w-2xl mx-auto flex flex-col gap-2 items-center',
        className
      )}
    >
      {messages.map((message, index) => (
        <p
          key={index}
          className={cn(
            'text-l font-medium tracking-wide text-white',
            index === 0 ? 'text-l font-bold text-white' : '',
            index === messages.length - 1 ? 'font-bold' : ''
          )}
        >
          {message}
        </p>
      ))}
    </section>
  );
}
