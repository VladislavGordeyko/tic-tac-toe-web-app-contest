# Tic Tac Toe with Telegram Web App Integration Documentation

Welcome to the Tic Tac Toe game integrated with the Telegram Web App! This project is more than just a game; it demonstrates the synergy between web sockets and the Telegram Web App features, illustrating the potential of real-time applications in our digitally connected age.

[@tictactoe_webapp_bot](https://t.me/tictactoe_webapp_bot) - a link to production bot where you can test it

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
- [Architecture](#architecture)
    - [Backend](#backend-1)
    - [Frontend](#frontend-1)
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

## Architecture
### Backend

The backend of the Tic Tac Toe application has been crafted using a blend of modern technologies, including Node.js, TypeScript, Express, Websockets, and the node-telegram-bot-api. The structure of the backend is designed for modularity, scalability, and clear division of responsibilities.

### Directory Structure

```
src
|-- routes
|-- telegramBot
|-- websockets
config.ts
index.ts
```

### 1. Routes

The `routes` folder contains the regular routes for the Express server. It controls the API of the server, typically utilized when there's a need to send some data from the client and execute certain actions, for instance, initiating a game invite.

### 2. Telegram Bot

The `telegramBot` directory consists of several files, including:

- **apiCommands**: This handles commands originating from the routes. A prime example is the `sendMessageToTgChat` function, which gets activated when the client dispatches a POST request to the `/inviteToGame` route. Thus, this module is more about the interaction between the client and the Telegram API.
  
- **chatCommands**: The logic for handling bot commands is in this file. It primarily deals with the backend's communication with the Telegram API.

- **constants & models**: These files contain constants related to the bot's operations and data models, respectively.

- **index**: This is the central file where the Telegram bot is initialized and used across the application. It currently processes the `/start` command. However, if developers intend to introduce more commands, they must be added here.

The `telegramBot` folder, in essence, facilitates both inbound and outbound communications with the Telegram API, making interactions seamless.

### 3. Websockets

The `websockets` directory is an essential component of the backend, facilitating real-time communications. Its structure includes:

- **ws**: The main file where websockets are initialized. It handles messages from the client and connection terminations. The system keeps track of connected clients in an array and maintains their sessions.

- **handlers**: This file handles various types of message events, such as `CREATE_SESSION`, `JOIN_SESSION`, `MOVE`, and `RESTART_GAME`. Additionally, it manages connection closures. Whenever a new websocket case is to be added, it must be incorporated into this file.

- **session & game**: The `session` file houses all the logic related to sessions. Conversely, the `game` file focuses on the game's core logic. Depending on the type of websocket message, the appropriate logic from either of these files gets triggered.

- **error**: Dedicated to managing websocket errors, ensuring that they're properly handled and don't disrupt the application's operations.

- **utils**: Contains utility functions that support websocket operations.

By adhering to this organized structure, the backend remains adaptable, allowing for easy updates and expansions in the future.


### Frontend

The frontend of the Tic Tac Toe application is designed using Next.js and TypeScript, embodying the modern development practices for scalability and efficiency.

### Directory Structure

```
src
|-- components
|-- context
|-- entities
|-- pages
|-- services
|-- styles
```

### 1. Components

The `components` folder houses React components, which are the building blocks of the application. The convention for structuring each component is as follows:

- **Component Name Folder**: For every component, a dedicated folder is created, named after the component.
  - **index.tsx**: This is the primary file, containing the main logic of the component.
  - **models.ts**: Contains all the interfaces and types that are pertinent to the component.
  - **componentName.module.scss**: This is dedicated to the component-specific styling.

### 2. Context

The `context` directory is instrumental in managing the application-wide state. It currently encapsulates:

- **WebSocketContext**: This context simplifies the use of websockets across various components. For instance, both the Lobby and Game components employ this context for real-time operations.

### 3. Entities

The `entities` folder is dedicated to declaring interfaces and types, which provides a strong typing system. This approach ensures code consistency and robustness by allowing type-checking during the development phase.

### 4. Pages

Adhering to the typical Next.js framework structure, the `pages` directory contains the application's routes:

- **index.tsx**: This is the main route, where the core logic of the entire application resides. It serves as the starting point when a user accesses the application.

### 5. Services

Located in the `services` folder, the utilities for API calls are placed here. These services handle communication with the backend, facilitating data transfer and real-time synchronization.

### 6. Styles

The `styles` directory is dedicated to the global styling of the application. Unlike the component-specific styles, this folder contains style definitions that apply to the application as a whole or reusable styles.

---

The frontend architecture, constructed on the Next.js framework, ensures a seamless user experience by efficiently leveraging components, contexts, and services. With a clean structure and organized codebase, future modifications and expansions can be easily integrated.


## Deployment

**Backend & Frontend**: Both the backend and frontend directories need to be deployed separately. While the steps provided below offer general guidelines for deployment on Heroku (backend) and Vercel (frontend), it's crucial to always refer to the platform's specific documentation for any platform-specific intricacies.

### Deploying Backend on Heroku

1. **Setup Heroku CLI**: If you haven't already, install the Heroku CLI by following the instructions on [Heroku's official documentation](https://devcenter.heroku.com/articles/heroku-cli).

2. **Login to Heroku**:
    ```bash
    heroku login
    ```

3. **Initialize a Git Repository** (if not already done):
    ```bash
    git init
    ```

4. **Create a New Heroku App**:
    ```bash
    heroku create [app-name]
    ```

5. **Add a Procfile to main folder**:
    ```bash
    web: node dist/index.js
    ```

6. **Add and Commit Your Changes**:
    ```bash
    git add .
    git commit -m "Initial Heroku deploy"
    ```

7. **Push to Heroku**:
    ```bash
    git push heroku master
    ```

8. Ensure you have all the necessary environment variables set on Heroku (similar to the `.env` file you might have locally). You can set them in the Heroku dashboard under the "Settings" tab or use the CLI.

9. Once deployed, you can open your app with:
    ```bash
    heroku open
    ```

### Deploying Frontend on Vercel

1. **Install Vercel CLI**:
    ```bash
    npm i -g vercel
    ```

2. **Login to Vercel**:
    ```bash
    vercel login
    ```

3. **Deploy**:
   Navigate to your frontend directory, then run:
    ```bash
    vercel
    ```

4. Follow the on-screen prompts. If asked, choose to link to an existing project or create a new one.

5. Ensure you have all necessary environment variables set up in Vercel (similar to the `.env` file you might have locally). You can set them in the Vercel dashboard under the "Settings" tab of your project.

6. Once deployed, Vercel will provide you with a live URL to access your application.


## Contribute

Feel free to contribute! If you find any issues or wish to add features, simply fork the repository, make your changes, and open a pull request.

## Conclusion

This project showcases the power of combining websockets with the Telegram API, enabling developers to craft unique, live experiences. Whether you're playing Tic Tac Toe with friends or exploring the technical depths, we hope you enjoy the journey!
