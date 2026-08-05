import { MessageCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import { QuoteType } from '@/types/QuoteType';
export default function CoachButton() {
  const navigator = useNavigate();
  return (
    <Button
      className="w-full border border-white/20 font-medium active:scale-95 p-6"
      onClick={() => navigator(`/pages/chat/${QuoteType.recovery_strength}`)}
    >
      <MessageCircle className="w-5 h-5" />
      Talk to the Recovery Coach
    </Button>
  );
}
