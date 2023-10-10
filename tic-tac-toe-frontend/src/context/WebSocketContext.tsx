import React, { createContext, useContext, useState } from 'react';
import useWebSocket from 'react-use-websocket';
import { IWebSocketContext, IWebSocketProvider } from './models';

const WebSocketContext = createContext<IWebSocketContext | undefined>(undefined);

export const useWebSocketContext = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error('useWebSocketContext must be used within a WebSocketProvider');
  }
  return context;
};

export const WebSocketProvider: React.FC<IWebSocketProvider> = ({ children, sessionId }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isError, setIsError] = useState(false);
  const WEBSOCKET_URL = process.env.NEXT_PUBLIC_WEBSOCKET_URL || 'ws://localhost:3000';
  const {
    sendMessage,
    lastMessage,
    readyState,
  } = useWebSocket(WEBSOCKET_URL, {
    onOpen: () => {
      setIsLoading(true);
      if (sessionId) {
        sendMessage(JSON.stringify({ type: 'JOIN_SESSION', sessionId, telegramData: window.Telegram.WebApp.initDataUnsafe }));
      } else {
        sendMessage(JSON.stringify({ type: 'CREATE_SESSION', telegramData: window.Telegram.WebApp.initDataUnsafe }));
      }
      setIsLoading(false);
    },
    onError: () => {
      setIsError(true);
      setError('Connection error');
      setIsLoading(false);
    },
    shouldReconnect: (closeEvent) => true,
  });

  return (
    <WebSocketContext.Provider value={{ sendMessage, lastMessage, readyState, isLoading, error, isError }}>
      {children}
    </WebSocketContext.Provider>
  );
};
