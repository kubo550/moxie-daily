import { Check } from 'lucide-react';

type ChallengeCardProps = {
  id: string;
  isCompleted: boolean;
  title: string;
  description: string;
  onToggle: (id: string) => void;
};
export default function ChallengeCard({
  id,
  isCompleted,
  title,
  description,
  onToggle,
}: ChallengeCardProps) {
  return (
    <li key={id}>
      <button
        onClick={() => onToggle(id)}
        className={`w-full text-left flex items-start gap-4 bg-gradient-to-br from-gray-800/60 via-gray-900/60 to-black/60 border border-white/10 hover:border-white/20 backdrop-blur-sm rounded-lg p-4 transition-all hover:scale-[1.01] active:scale-95 ${
          isCompleted ? 'opacity-60' : ''
        }`}
      >
        {/* Checkbox */}
        <div className="flex-shrink-0 mt-1">
          <div
            className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all ${
              isCompleted
                ? 'bg-green-500 border-green-500'
                : 'border-white/30 bg-transparent'
            }`}
          >
            {isCompleted && <Check className="w-4 h-4 text-white" />}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          <p
            className={`font-semibold text-base mb-1 ${isCompleted ? 'line-through' : ''}`}
          >
            {title}
          </p>
          <p className="text-sm text-gray-300">{description}</p>
        </div>
      </button>
    </li>
  );
}
