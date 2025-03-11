import React from 'react';
import { Message } from '../store/chatSlice';

interface ChatMessageProps {
  message: Message;
  isLast: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isLast }) => {
  const isUser = message.role === 'user';
  
  return (
    <div 
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-6 group`}
      data-last={isLast}
    >
      <div className={`flex items-start max-w-[80%] space-x-3 ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
          isUser ? 'glass-darker' : 'glass'
        }`}>
          <span className="text-sm font-medium">
            {isUser ? 'You' : 'AI'}
          </span>
        </div>
        <div
          className={`rounded-2xl px-4 py-3 ${
            isUser 
              ? 'glass-darker rounded-br-sm' 
              : 'glass rounded-bl-sm'
          } group-hover:border-opacity-50 transition-all`}
        >
          <p className="whitespace-pre-wrap text-[15px] leading-relaxed">
            {message.content}
          </p>
          <span className="text-xs text-gray-400 mt-2 block opacity-0 group-hover:opacity-100 transition-opacity">
            {new Date(message.timestamp).toLocaleTimeString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage; 