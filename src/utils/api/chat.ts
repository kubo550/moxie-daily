import { apiClient } from '@/utils/api/apiClient.ts';
import { Message } from '@/types/QuoteType.ts';

export const askByApiCall = async (conversation: Message[]) => {
  const response = await apiClient.post(
    '/daily/chat',
    {
      conversation,
    },
    { withCredentials: true }
  );
  return response.data;
};
