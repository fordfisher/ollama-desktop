import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { setSelectedModel, clearMessages } from '../store/chatSlice';
import StatusIndicator from './StatusIndicator';

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const selectedModel = useSelector((state: RootState) => state.chat.selectedModel);

  const models = ['llama2', 'codellama', 'mistral'];

  return (
    <div className="glass border-b border-white/5 sticky top-0 z-10">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              AI Desktop
            </h1>
            <select
              value={selectedModel}
              onChange={(e) => dispatch(setSelectedModel(e.target.value))}
              className="glass-darker px-3 py-1.5 rounded-lg border border-white/5 focus:outline-none focus:border-blue-500/50 transition-colors text-sm"
            >
              {models.map((model) => (
                <option key={model} value={model} className="bg-gray-800">
                  {model}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center space-x-4">
            <StatusIndicator />
            <button
              onClick={() => dispatch(clearMessages())}
              className="glass-darker px-3 py-1.5 rounded-lg border border-white/5 hover:border-white/10 transition-colors text-sm font-medium"
            >
              Clear Chat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header; 