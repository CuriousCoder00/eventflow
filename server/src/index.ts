import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { Server as socketIOServer } from 'socket.io';

import { PORT } from './lib/config';
import { db } from './lib/db';
import authRouter from './routes/auth.routes';
import eventRouter from './routes/event.routes';


// Connect to the database
db();

// Create an Express app
const app = express();

const server = http.createServer(app);
const io = new socketIOServer(server, { cors: { origin: '*' } });

// Use the Express JSON parser
app.use(express.json());
// Use the Express URL-encoded parser
app.use(express.urlencoded({ extended: true }));
// Use the body parser
app.use(bodyParser.json());
// Use the CORS middleware
app.use(cors({ credentials: true, origin: true }));
// Use the cookie parser
app.use(cookieParser());


// Routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/event', eventRouter);

// Socket.io Realtime Connection

io.on('connection', (socket) => {
    console.log('A user connected');
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
}).on('error', (error) => {
    console.error('Error starting server: ', error);
});