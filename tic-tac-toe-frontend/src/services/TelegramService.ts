import { Api } from './Api';
import { IApiResponse, ISendMessageChatData, ITelegramService } from './models';

const APIUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
const sendGameInvite = `${APIUrl}/inviteToGame`;
const getPhoto = `${APIUrl}/getUserPhoto`;

export class TelegramService implements ITelegramService {
  private _api = Api.getInstance();

  public async sendGameInviteToChat(message: string, chatId: string, sessionId: string): Promise<ISendMessageChatData | undefined> {
    try {
      const result = <IApiResponse<ISendMessageChatData>>await this._api.post(sendGameInvite, {message, chatId, sessionId});
      return result.data;
    } catch (error) {
      console.log(error);
    }
  }
  public async sendMessage(message: string): Promise<boolean> {
    try {
      const result = <IApiResponse<boolean>>await this._api.post(APIUrl, {message});
      return result.data;
    } catch (error) {
      console.log(error);
            
      return false;
    }
  }

  public async getProfilePhoto(userId: number): Promise<any> {
    try {
      const result = <IApiResponse<boolean>>await this._api.get(`${getPhoto}?userId=${userId}`);
      return result.data;
    } catch (error) {
      console.log(error);
            
      return false;
    } 
  }
    
}