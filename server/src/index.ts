import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';
import { JWT_SECRET, PORT } from './lib/config';
import { db } from './lib/db';
import authRouter from './routes/auth.routes';
import eventRouter from './routes/event.routes';


// Connect to the database
db();

// Create an Express app
const app = express();

const server = http.createServer(app);
export const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
        credentials: true,
    },
});


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

io.use((socket, next) => {
    const token = socket.handshake.headers.cookie?.split('=')[1];
    if (token && jwt.verify(token, JWT_SECRET)) {
        next();
    } else {
        next(new Error('Unauthorized'));
    }
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    socket.on('message', (msg) => {
        console.log('message: ' + msg);
        io.emit('message', msg);
    });
    socket.addListener('eventCreated', (event) => {
        console.log('event created: ', event);
        io.emit('eventCreated', event);
    });
    socket.on('eventCreated', (event) => {
        console.log('event created: ', event);
        io.emit('eventCreated', event);
    });
    socket.on('error', (error) => {
        console.error('Socket error: ', error);
    });
});

// Start the server
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
}).on('error', (error) => {
    console.error('Error starting server: ', error);
});