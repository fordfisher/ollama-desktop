import React from 'react';
import { useOllamaStatus } from '../hooks/useOllamaStatus';

const StatusIndicator: React.FC = () => {
  const { isConnected, isChecking } = useOllamaStatus();

  return (
    <div className="glass-darker px-3 py-1.5 rounded-lg border border-white/5 flex items-center gap-2">
      <div
        className={`w-2 h-2 rounded-full ${
          isChecking
            ? 'bg-yellow-400'
            : isConnected
            ? 'bg-emerald-400'
            : 'bg-red-400'
        } relative`}
      >
        <div
          className={`absolute inset-0 w-full h-full rounded-full animate-ping ${
            isChecking
              ? 'bg-yellow-400/40'
              : isConnected
              ? 'bg-emerald-400/40'
              : 'bg-red-400/40'
          }`}
        />
      </div>
      <span className="text-sm">
        {isChecking
          ? 'Checking Ollama...'
          : isConnected
          ? 'Connected'
          : 'Disconnected'}
      </span>
    </div>
  );
};

export default StatusIndicator; 