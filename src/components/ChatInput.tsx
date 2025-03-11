import React, { useState, KeyboardEvent } from 'react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, disabled }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="glass border-t border-white/5 sticky bottom-0 z-10">
      <div className="max-w-5xl mx-auto px-4 py-4">
        <div className="flex items-end gap-4">
          <div className="flex-1">
            <textarea
              className="w-full glass-darker rounded-xl px-4 py-3 resize-none min-h-[20px] max-h-[200px] focus:outline-none focus:ring-1 focus:ring-blue-500/50 placeholder-gray-400 border border-white/5"
              placeholder="Send a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              disabled={disabled}
              rows={1}
              style={{
                height: '56px',
                overflowY: 'auto',
              }}
            />
          </div>
          <button
            className={`p-3 rounded-xl ${
              disabled || !message.trim()
                ? 'glass-darker opacity-50 cursor-not-allowed'
                : 'glass hover:border-white/10 active:scale-95'
            } border border-white/5 transition-all flex-shrink-0`}
            onClick={handleSubmit}
            disabled={disabled || !message.trim()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path d="M3.478 2.404a.75.75 0 00-.926.941l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.404z" />
            </svg>
          </button>
        </div>
        <div className="mt-2 text-center">
          <p className="text-xs text-gray-400">
            Press Enter to send, Shift + Enter for new line
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatInput; 