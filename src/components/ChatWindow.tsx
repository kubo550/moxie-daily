import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Message, QuoteType, Role } from '@/types/QuoteType.ts';
import {
  getGreetingCustomerMessageSuggestions,
  getGreetingMessageForCoach,
} from '@/utils/chatHelpers.ts';
import { askByApiCall } from '@/utils/api/chat.ts';
import { getQuoteTypeName } from '@/utils/quotes.ts';

interface ChatWindowProps {
  type: QuoteType;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({ type }) => {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, content: getGreetingMessageForCoach(type), role: Role.assistant },
  ]);
  const [input, setInput] = useState('');
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [isError, setIsError] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const sendMessage = async () => {
    setIsError(false);
    if (input.trim() === '') return;

    const newMessage: Message = {
      id: Date.now(),
      content: input,
      role: Role.user,
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput('');
    await askBot(input);
  };

  const handleSuggestionClick = async (text: string) => {
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), content: text, role: Role.user },
    ]);
    await askBot(text);
  };
  const askBot = async (userReply: string) => {
    setIsBotTyping(true);

    try {
      const response = await askByApiCall([
        ...messages,
        { id: Date.now(), content: userReply, role: Role.user },
      ]);
      const botMessage: Message = {
        id: Date.now(),
        content: response.reply,
        role: Role.assistant,
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (e) {
      setIsError(true);
      console.error('Error:', e);
    } finally {
      setIsBotTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') sendMessage();
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isBotTyping]);

  const suggestions = getGreetingCustomerMessageSuggestions(type);

  return (
    <div className="max-w-xl flex flex-col bg-gradient-to-br from-gray-800 via-gray-900 to-black absolute top-[60px] min-h-[calc(100vh-60px)] left-0 sm:left-1/2 sm:transform sm:-translate-x-1/2 min-w-[100%] sm:min-w-[500px] sm:max-w-[500px] shadow-lg rounded-lg">
      <div className="min-w-full pt-6 pb-3 text-white text-lg font-semibold flex items-center space-x-4 relative">
        <Link to={`/pages/chat`}>
          <button className="text-white px-3 py-1 rounded absolute left-0 top-5">
            ← Back
          </button>
        </Link>
        <span className="text-center w-full pl-10">
          Chatting with {getQuoteTypeName(type)} coach
        </span>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-2 min-w-full ">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === Role.assistant ? 'justify-start text-left' : 'justify-end text-right'}`}
          >
            <div
              className={`p-3 rounded shadow max-w-xs ${
                msg.role === Role.assistant
                  ? 'bg-gray-900 text-gray-300'
                  : 'bg-blue-500 text-white'
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {isBotTyping && <TypingIndicator />}

        <div ref={messagesEndRef} />

        {!isBotTyping && (
          <Suggestions
            suggestions={suggestions}
            onClick={handleSuggestionClick}
          />
        )}
      </div>

      {isError && (
        <div className="text-red-500 text-center p-4">
          An error occurred while fetching the response. Please try again later.
        </div>
      )}

      <div className="p-4 bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white border-t border-white/10 flex items-center space-x-2 mb-[80px]">
        <input
          type="text"
          className="flex-1 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 "
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

const TypingIndicator = () => (
  <div className="flex justify-start">
    <div className="flex space-x-1 p-3 rounded bg-gray-900 text-white max-w-xs">
      <div className="animate-bounce w-2 h-2 bg-gray-300 rounded-full [animation-delay:0ms]" />
      <div className="animate-bounce w-2 h-2 bg-gray-300 rounded-full [animation-delay:200ms]" />
      <div className="animate-bounce w-2 h-2 bg-gray-300 rounded-full [animation-delay:400ms]" />
    </div>
  </div>
);

interface SuggestionsProps {
  suggestions: string[];
  onClick: (text: string) => void;
}

const Suggestions = ({ suggestions, onClick }: SuggestionsProps) => {
  if (suggestions.length === 0) return null;

  return (
    <div className="flex flex-col items-end w-full px-4 pb-2 mt-4">
      <div className="flex flex-wrap gap-2 justify-end mb-2">
        {suggestions.map((suggestion, idx) => (
          <button
            key={idx}
            onClick={() => onClick(suggestion)}
            className="bg-blue-500 border border-black text-sm px-3 py-2 rounded transition text-white"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
};
