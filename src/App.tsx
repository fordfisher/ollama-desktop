import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import ChatWindow from './components/ChatWindow';

function App() {
  return (
    <Provider store={store}>
      <div className="h-screen bg-gray-900">
        <ChatWindow />
      </div>
    </Provider>
  );
}

export default App; 