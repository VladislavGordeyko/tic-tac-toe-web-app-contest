import TelegramBot from 'node-telegram-bot-api';
import { botOptions, env } from '../../config';
import { startGameCommand } from './chatCommands';

// Extracting necessary environment variables.
const { TOKEN, WEBHOOK } = env;

// Initializing the Telegram bot.
const bot = new TelegramBot(TOKEN, botOptions);

// If polling on then we dont need webhook
if (!botOptions.polling) {
  // Setting up the webhook for the bot.
  bot.setWebHook(`${WEBHOOK}/bot${TOKEN}`);
}

// Registering a command handler for the '/start' command.
bot.onText(/\/start/, startGameCommand(bot));

// Exporting the bot instance to be used elsewhere in the application.
export default bot;