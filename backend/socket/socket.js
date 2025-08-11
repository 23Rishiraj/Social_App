import { Server } from 'socket.io';
import http from 'http';
import express from 'express';
import Conversation from '../models/conversationModal.js';
import Message from '../models/messageModal.js';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "https://chatalyst-backend.onrender.com", // Update with your frontend URL
        methods: ["GET", "POST"],
        // credentials: true,
    },
});

export const getRecipientSocketId = (recipientId) => {
    return userSocketMap[recipientId];
};

const userSocketMap = {};

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);
    const userId = socket.handshake.query.userId;

    if (userId != "undefined") userSocketMap[userId] = socket.id;
    io.emit("getOnlineUser", Object.keys(userSocketMap));

    socket.on("markMessagesAsSeen", async ({ conversationId, userId }) => {
        try {
            await Message.updateMany({ conversationId: conversationId, seen: false }, { $set: { seen: true } });
            await Conversation.updateOne({ _id: conversationId}, { $set: { "lastMessage.seen": true } })

            io.to(userSocketMap[userId]).emit("messagesSeen", { conversationId });
        } catch (error) {
            console.log(error);
        }
    })

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
        delete userSocketMap[userId];
        io.emit("getOnlineUser", Object.keys(userSocketMap));
    });
});

export { io, server, app };
