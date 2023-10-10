import dotenv from 'dotenv';

dotenv.config();

export const botOptions = {
  polling: false,
};

type Env = {
     // Telegram bot token
    TOKEN: string,
    PORT: number,
    // Web hook for telegram bot. Should be the same as this deployed application
    WEBHOOK: string,
     // Link of your web app which gave you bot father 
    WEBAPPURLTELEGRAM: string
};

export const env: Env = {
  TOKEN: process.env.TOKEN!,
  PORT: Number(process.env.PORT!),
  WEBHOOK: process.env.WEBHOOK!,
  WEBAPPURLTELEGRAM: process.env.WEBAPPURLTELEGRAM!,
};

