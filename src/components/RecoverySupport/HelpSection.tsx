import { NATIONAL_RECOVERY_RESOURCES } from '@/config/recoverySupport';
import { cn } from '@/lib/utils';
import { Globe, Phone } from 'lucide-react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';

export default function HelpSection({ className }: { className?: string }) {
  return (
    <section className={cn('', className)}>
      <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">
        Meetings & Helplines
      </h2>
      <div className="flex flex-col gap-3">
        {NATIONAL_RECOVERY_RESOURCES.map((res, i) => (
          <HelplineCard
            key={i}
            title={res.label}
            content={res.description}
            linkText={res.linkText}
            href={res.href}
            isPhone={res.href.startsWith('tel:')}
          />
        ))}
      </div>
    </section>
  );
}

type HelplineCardProps = {
  title: string;
  content: string;
  isPhone: boolean;
  linkText: string;
  href: string;
};

function HelplineCard(props: HelplineCardProps) {
  return (
    <Card className="flex gap-3 bg-white/5 border-white/10 border">
      <CardHeader className="flex border-0 w-full justify-start items-center text-white font-semibold text-md">
        <div className="flex flex-grow-0 flex-shrink-0">
          {props.isPhone ? (
            <Phone className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
          ) : (
            <Globe className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
          )}
        </div>
        <p className="flex flex-1 items-center justify-center">{props.title}</p>
      </CardHeader>
      <CardContent className="text-gray-300 text-sm mb-2">
        {props.content}
      </CardContent>
      <CardFooter className="flex items-center justify-center">
        <a
          href={props.href}
          target={props.isPhone ? undefined : '_blank'}
          rel={props.isPhone ? undefined : 'noopener noreferrer'}
          className={`inline-flex items-center gap-2 text-sm font-medium ${
            props.isPhone
              ? 'text-purple-400 hover:text-purple-300'
              : 'text-amber-400 hover:text-amber-300'
          }`}
        >
          {props.linkText}
        </a>
      </CardFooter>
    </Card>
  );
}
