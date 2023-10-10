import { WebSocketMessage } from 'react-use-websocket/dist/lib/types';

export interface IWebSocketProvider {
    children: React.ReactNode,
    sessionId?: string
  }

export enum ReadyState {
    UNINSTANTIATED = -1,
    CONNECTING = 0,
    OPEN = 1,
    CLOSING = 2,
    CLOSED = 3,
  }

export interface IWebSocketContext {
    sendMessage: (message: WebSocketMessage) => void,
    lastMessage: any,
    readyState: ReadyState,
    isLoading: boolean,
    error: string,
    isError: boolean,
  }