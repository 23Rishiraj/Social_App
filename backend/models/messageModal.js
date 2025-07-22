import mongoose from 'mongoose';
import Conversation from './conversationModal.js';

const messageSchema = new mongoose.Schema({
    conversationId: {type:mongoose.Schema.Types.ObjectId, ref: 'Conversation'},
    senderId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    text: String,
},{timestamps: true});

const Message = mongoose.model('Message', messageSchema);
export default Message;
