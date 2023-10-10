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
    - [Backend](#backend)
    - [Frontend](#frontend)
- [Running Locally](#running-locally)
- [Deployment](#deployment)
- [Contribute](#contribute)

## Prerequisites

Before diving into the setup, make sure you have the following:

- Node.js (version >= 14)
- npm (typically comes with Node.js)
- A Telegram account

## Getting Started

This project is split into two main parts:

1. `tic-tac-toe-backend`: Handles the game logic, integrates with Telegram using the node-telegram-bot-api, and manages websocket connections.
2. `tic-tac-toe-frontend`: A Next.js React application for the game's UI.

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

3. Create a `.env` file in the root directory with the following:

```
TELEGRAM_BOT_TOKEN=YOUR_TELEGRAM_BOT_TOKEN
```

*Note*: Replace `YOUR_TELEGRAM_BOT_TOKEN` with the token you get after creating your Telegram bot.

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

*Note*: Ensure your backend server is running so that the frontend can connect via websockets.

## Running Locally

### Backend

From the `tic-tac-toe-backend` directory:

```bash
npm start
```

This will start your server, typically on `http://localhost:3000`.

### Frontend

From the `tic-tac-toe-frontend` directory:

```bash
npm run dev
```

This will start your frontend, typically on `http://localhost:3001`.

## Deployment

**Backend & Frontend**: Both folders need to be deployed separately. Depending on your deployment platform (like Vercel, Netlify, Heroku, etc.), the steps may vary. Always refer to the platform's specific documentation for deploying Node.js applications and Next.js applications.

## Contribute

Feel free to contribute! If you find any issues or wish to add features, simply fork the repository, make your changes, and open a pull request.

## Conclusion

This project showcases the power of combining websockets with the Telegram API, enabling developers to craft unique, live experiences. Whether you're playing Tic Tac Toe with friends or exploring the technical depths, we hope you enjoy the journey!
