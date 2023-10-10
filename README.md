# Tic Tac Toe with Telegram Web App Integration Documentation

Welcome to the Tic Tac Toe game integrated with the Telegram Web App! This project is more than just a game; it demonstrates the synergy between web sockets and the Telegram Web App features, illustrating the potential of real-time applications in our digitally connected age.

## Why Tic Tac Toe?

Tic Tac Toe is a clear and comprehensible example, allowing novice and seasoned developers to grasp the underlying technologies without being overwhelmed. But the horizon doesn't stop here. By harnessing the power of web sockets with the Telegram Web APP, a myriad of applications can be realized:

1. **Collaborative Tools:** Imagine apps like shared whiteboards, real-time code editors, or design platforms where multiple users can collaborate simultaneously.
2. **Live Notifications & Alerts:** Systems that update users about important events, news, or updates as soon as they occur.
3. **Online Multiplayer Games:** Beyond Tic Tac Toe, one could craft multiplayer games like chess, checkers, or even more complex board games.
4. **Education & Webinars:** Platforms where instructors can engage with students in real-time, conducting polls, Q&A sessions, or group projects.

The combination of websockets for real-time communication and the Telegram Web APP for its wide-reaching user base and robust features, lays the foundation for the future of interactive web applications.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
    - [Telegram Bot](#telegram-bot)
- [Running Locally](#running-locally)
- [Deployment](#deployment)
- [Contribute](#contribute)

## Prerequisites

Before diving into the setup, make sure you have the following:

- Git
- Node.js (version >= 14)
- npm (typically comes with Node.js)
- A Telegram account
- ngrok (for local deployment)

## Getting Started

Choose a location on your machine for your local copy. Clone the repo using:
```bash
git clone https://github.com/VladislavGordeyko/tic-tac-toe-web-app-contest.git
```

This project is split into two main parts:

1. `tic-tac-toe-backend`: Handles the game logic, integrates with Telegram using the node-telegram-bot-api, and manages websocket connections.
2. `tic-tac-toe-frontend`: A Next.js React application for the game's UI.

### Telegram Bot
1. Start a chat with BotFather:
BotFather is the official Telegram bot used to create new bots. You can find it by searching for `@BotFather` in the Telegram search bar or using this link: [https://t.me/BotFather](https://t.me/BotFather).

2. Create a new bot:
- Send the command `/newbot` to BotFather.
- BotFather will then ask you to choose a name for your bot. This is the display name that users will see in conversation with your bot.
- After that, you'll be asked to pick a username for your bot. It must end in `bot` (e.g., `examplebot` or `example_bot`).

3. Get your Telegram BOT token:
Once you've chosen a username, BotFather will provide you with a token. This token is essential for sending requests to the Telegram Bot API. **Store it securely**. 

Next steps depend on how you want to start: local development or deploy.

For local development BOT API token will be enought but for deployment you need to prossed next steps:

1. Creating a Web app bot:
send the command `/newapp` to BotFather and choose your newly created bot; type title for your web app; add a photo  640x360 pixels (e.g <details><summary>Show image</summary>![TicTacToe](/assets/tictactoe.png "tictactoe image")</details>).
2.  Next step is add a gif - this step can skip with command `/empty`.
3.  You need to provide a Client URL of your app (Instruction to that is in [Deployment](#deployment) part) 
4. Provide a short name for your web app (e.g tictactoe, full link will be t.me/YOUR_BOT_NAME/tictactoe - this link we will use in Backend part)

## Running Locally

### Backend

#### Setting up

1. Navigate to the `tic-tac-toe-backend` directory:

    ```bash
    cd tic-tac-toe-backend
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` or make copy of `example.env` file  in the root directory with the following:

    ```
    TOKEN=TELEGRAM_BOT_TOKEN
    PORT=3000
    WEBHOOK=LINK_TO_YOUR_API
    WEBAPPURLTELEGRAM=LINK_TO_YOUR_TELEGRAM_WEB_APP
    ```

    *Note*: Replace `YOUR_TELEGRAM_BOT_TOKEN` with the token you get after creating your Telegram bot. `WEBHOOK` it the same addres of API but which should be provided as local IP adderes (e.g `http://192.168.1.22:3000`). `WEBAPPURLTELEGRAM` we will get soon when client will be started.
4. in file `tic-tac-toe-backend/config.ts` change botOptions object property polling to true:
     ```
    export const botOptions = {
        polling: true,
    };
    ```
    This will use polling functionality of telegram bot - this is typically used in local development


#### Start locally 

```bash
npm run dev
```

This will start your server, typically on `http://localhost:3000`.

### Frontend


#### Setting up

1. Navigate to the `tic-tac-toe-frontend` directory:

    ```bash
    cd tic-tac-toe-frontend
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` or make copy of `example.env` file and rename it to  `.env` in the root directory with the following:

    ```
    NEXT_PUBLIC_WEBSOCKET_URL=ws://localhost:3000
    NEXT_PUBLIC_API_URL=http://localhost:3000
    ```

*Note*: Ensure your backend server is running so that the frontend can connect via websockets.

#### Start locally 

1. Start local server
    ```bash
    npm run dev
    ```
    This will start your frontend on `http://localhost:3001`.


2. Start ngrok server 
    ```bash
    ngrok http 3001
    ```
    Your Client will be availible through web and will have `https` protocol.

    *Note*: Please [read documentation of ngrok](https://ngrok.com/docs/getting-started/) for setup. You need to register a free account, download ngrok and provide a token. 
3. Copy link of ngrok (e.g  `https://c103-176-41-42-1.ngrok-free.app`) and past this link to `tic-tac-toe-backend/.env` file as `WEBAPPURLTELEGRAM` variable

And now you ready to go!

## Deployment

**Backend & Frontend**: Both folders need to be deployed separately. Depending on your deployment platform (like Vercel, Netlify, Heroku, etc.), the steps may vary. Always refer to the platform's specific documentation for deploying Node.js applications and Next.js applications.

## Contribute

Feel free to contribute! If you find any issues or wish to add features, simply fork the repository, make your changes, and open a pull request.

## Conclusion

This project showcases the power of combining websockets with the Telegram API, enabling developers to craft unique, live experiences. Whether you're playing Tic Tac Toe with friends or exploring the technical depths, we hope you enjoy the journey!
