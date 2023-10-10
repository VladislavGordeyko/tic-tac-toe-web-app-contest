import express, { Express } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import http from 'http';
import setupWebSocket from './src/websockets/ws';
import { env } from './config';
import router from './src/routes';

// Initialize the Express application
const app: Express = express();
app.use(cors());
app.use(bodyParser.json());

const { PORT } = env;

// Use the defined routes for the application
app.use(router);

// Set up websocket connections for the server
const server = http.createServer(app);
setupWebSocket(server);

server.listen(PORT, () => {
  console.log(`Server started on ${PORT} port`);
});