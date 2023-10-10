export interface IApiResponse<Type> {
    data: Type,
    status: string
    message: string,
    error?: boolean,
}

export interface IApi {
    get(uri: string): Promise<IApiResponse<unknown>>;
    post(uri: string, body?: unknown): Promise<IApiResponse<unknown>>;
}

export interface ITelegramService {
    sendGameInviteToChat(message: string, chatId: string, sessionId: string): Promise<ISendMessageChatData | undefined>;
    sendMessage(message: string): Promise<boolean>;
}

export interface ISendMessageChatData {
    message: string, 
    chatId: string, 
    sessionId: string
}