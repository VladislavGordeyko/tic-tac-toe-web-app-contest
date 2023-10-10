import { Request, Response } from 'express';
import { ISendMessageChatData } from '../telegramBot/models';
import bot from '../telegramBot';
import { botProcessUpdate, getUserPhotoLink, sendGameInviteToChat } from '../telegramBot/apiCommands';
import { env } from '../../config';
import express from 'express';

const router = express.Router();

const { TOKEN } = env;

// Endpoint for Telegram bot updates.
router.post(`/bot${TOKEN}`, (req: Request, res: Response) => {
  botProcessUpdate(bot, req);
  res.sendStatus(200);
});

// Endpoint to invite users to a game.
router.post('/inviteToGame', (req: Request, res: Response) => {
  const postData: ISendMessageChatData = req.body;

  // Send the game invite to the specified Telegram chat.
  sendGameInviteToChat(bot, postData.message, postData.chatId, postData.sessionId);
  
  res.json({
    status: 'success',
    message: 'Data received!',
    data: postData
  });
});

// Endpoint to get a user's Telegram photo.
router.get('/getUserPhoto', (req: Request, res: Response) => {
  const userId = req.query.userId as string;
  if (userId) {
    // Fetch the user's Telegram photo.
    getUserPhotoLink(bot, userId);
  }

  res.json({
    status: 'success',
    message: 'Data received!',
    data: ''
  });
});

export default router;