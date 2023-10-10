import TelegramBot from 'node-telegram-bot-api';
import { env } from '../../config';
import { Request } from 'express';
import { INVITETEXT } from './constants';

const { WEBAPPURLTELEGRAM } = env;

// Send a given message to a specific Telegram chat.
export const sendMessageToTgChat = (bot: TelegramBot) => (chatId: number, message: string) => {
  bot.sendMessage(chatId, message);
};

// Process incoming updates for the bot.
export const botProcessUpdate = (bot: TelegramBot, req: Request) => {
  bot.processUpdate(req.body);
};

// Retrieve the direct link for a given file ID.
export const getFileLink = async (bot: TelegramBot, fileId: string) => {
  const link = await bot.getFileLink(fileId);
  return link;
};

// Fetch the profile photo link of a user.
export const getUserPhotoLink = async (bot: TelegramBot, userId: string) => {
  try {
       
    const result = await bot.getUserProfilePhotos(Number(userId), {limit: 0, offset: 0});
    if (result.total_count > 0) {
      const link = await getFileLink(bot, result.photos[0][0].file_id);
      return link;
    }
    return ''; 
  } catch (error) {
    return ''; 
  }
};

// Send a game invite link to a Telegram chat.
export const sendGameInviteToChat = (bot: TelegramBot, message: string, chatId: string, sessionId: string,) => {
  bot.sendMessage(chatId, INVITETEXT, {
    reply_markup: {
      inline_keyboard: [[
        {
          text: 'Join Game!',
          url: `${WEBAPPURLTELEGRAM}?startapp=sessionId__${sessionId}`,
        }
      ]] 
    }
  });
};