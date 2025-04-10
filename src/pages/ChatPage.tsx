import { useNavigate, useParams } from 'react-router-dom';
import { ChatWindow } from '@/components/ChatWindow.tsx';
import { QuoteType } from '@/types/QuoteType.ts';

export const ChatPage = () => {
  const { type } = useParams();
  const navigate = useNavigate();

  if (!type) {
    navigate('/pages/chatHelpers.ts');
  }

  return <ChatWindow type={type as QuoteType} />;
};
