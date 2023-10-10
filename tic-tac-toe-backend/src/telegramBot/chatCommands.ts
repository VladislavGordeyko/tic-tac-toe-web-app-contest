import TelegramBot, {  Message } from 'node-telegram-bot-api';
import { botOptions, env } from '../../config';
import { WELCOMETEXTGROUP, WELCOMETEXTPRIVATE } from './constants';

const { WEBAPPURLTELEGRAM } = env;

// Handles the /start command for the bot.
// Sends a game start link depending on whether the command came from a private chat or a group chat.
export const startGameCommand = (bot: TelegramBot) => (msg: Message) => {
  const chatId = msg.chat.id;
  const isLocal = botOptions.polling;

  // If the command is from a private chat, send the private welcome text.
  if (msg.chat.type === 'private') {
    bot.sendMessage(chatId, WELCOMETEXTPRIVATE, {
      reply_markup: {
        inline_keyboard: [[
          isLocal ? 
            {
              text: 'Start!',
              web_app: {url: WEBAPPURLTELEGRAM} ,
            } : 
            {
              text: 'Start!',
              url: `${WEBAPPURLTELEGRAM}?startapp=onlyAI__${1}`
            }
        ]]
      }
    });
    // If the command is from a group or supergroup, send the group welcome text.
  } else if (msg.chat.type === 'group' || msg.chat.type === 'supergroup') {
    bot.sendMessage(chatId, WELCOMETEXTGROUP, {
      reply_markup: {
        inline_keyboard: [[
          isLocal ? 
            {
              text: 'Start!',
              web_app: {url: WEBAPPURLTELEGRAM} ,
            } : {
              text: 'Start!',
              url: `${WEBAPPURLTELEGRAM}?startapp=chatId__${chatId}`
            }
        ]] 
      }
    }); 
  }
};
