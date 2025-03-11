import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { addMessage, setLoading, setError } from '../store/chatSlice';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import Header from './Header';

const ChatWindow: React.FC = () => {
  const dispatch = useDispatch();
  const { messages, isLoading, selectedModel, error } = useSelector((state: RootState) => state.chat);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;
    
    dispatch(addMessage({ content, role: 'user' }));
    dispatch(setLoading(true));
    dispatch(setError(null));

    try {
      const response = await fetch('http://localhost:11434/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: selectedModel,
          messages: [
            ...messages.map(msg => ({
              role: msg.role,
              content: msg.content
            })),
            { role: 'user', content }
          ],
          stream: false
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response from Ollama');
      }

      const data = await response.json();
      dispatch(addMessage({ content: data.message.content, role: 'assistant' }));
    } catch (error) {
      console.error('Error:', error);
      dispatch(setError((error as Error).message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="flex flex-col h-screen bg-transparent">
      <Header />
      <div className="flex-1 overflow-hidden relative">
        <div className="absolute inset-0 overflow-y-auto">
          {messages.length === 0 ? (
            <div className="h-full flex items-center justify-center">
              <div className="glass p-8 rounded-2xl text-center max-w-md mx-4">
                <h2 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Welcome to AI Desktop
                </h2>
                <p className="text-gray-400">
                  Start a conversation with your AI assistant. Ask anything!
                </p>
              </div>
            </div>
          ) : (
            <div className="max-w-5xl mx-auto py-4 px-4">
              {messages.map((message, index) => (
                <ChatMessage key={message.id} message={message} isLast={index === messages.length - 1} />
              ))}
              {isLoading && (
                <div className="flex justify-center py-4">
                  <div className="glass px-4 py-2 rounded-full animate-pulse">
                    <span className="text-blue-400">AI is thinking...</span>
                  </div>
                </div>
              )}
              {error && (
                <div className="glass-darker text-red-400 p-4 rounded-xl mx-4 mb-4 border border-red-500/20">
                  <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <span>{error}</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      </div>
      <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
    </div>
  );
};

export default ChatWindow; 