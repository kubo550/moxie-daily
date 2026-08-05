import { cn } from '@/lib/utils';
import { ChevronDownIcon } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../ui/collapsible';
import { Separator } from '../ui/separator';
import { AboutMeElement, aboutMeElements } from './content';

export default function CollapsibleAboutSection({
  className,
}: {
  className: string;
}) {
  return (
    <div className={cn('flex flex-col mb-3', className)}>
      {aboutMeElements.map((element, i) => (
        <CollapsibleAboutSectionElement key={i} element={element} index={i} />
      ))}
    </div>
  );
}

const renderContent = (content: string) => {
  return content.split('\n\n').map((paragraph, index) => (
    <p key={index} className="text-sm text-gray-200 text-justify mb-3">
      {paragraph}
    </p>
  ));
};

function CollapsibleAboutSectionElement({
  element,
  index,
}: {
  element: AboutMeElement;
  index: number;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div>
      <Collapsible
        onOpenChange={(open) => {
          setIsOpen(open);
        }}
        key={index}
        className="max-w-xl mx-auto mt-4 mb-4"
      >
        <CollapsibleTrigger className="text-l font-semibold flex flex-1 w-full justify-between">
          <p className="text-white font-semibold">{element.title}</p>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDownIcon />
          </motion.div>
        </CollapsibleTrigger>
        <CollapsibleContent>
          {renderContent(element.content)}
          <div>
            {element.bulletPoints.length > 0 && (
              <ul className="list-disc pl-5 mt-2 text-sm text-gray-200">
                {element.bulletPoints.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            )}
          </div>
        </CollapsibleContent>
      </Collapsible>
      <Separator className="bg-neutral-300" />
    </div>
  );
}
