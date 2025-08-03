import mongoose from 'mongoose';
import { type } from 'os';

const messageSchema = new mongoose.Schema({
    conversationId: {type:mongoose.Schema.Types.ObjectId, ref: 'Conversation'},
    sender: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    text: String,
    seen: {type: Boolean, default: false},
    img:{
        type:String,
        default:"",
    }
    // createdAt: {type: Date, default: Date.now},
    // updatedAt: {type: Date, default: Date.now},
    // replyTo: {type: mongoose.Schema.Types.ObjectId, ref: 'Message', default: null},
},{timestamps: true});

const Message = mongoose.model('Message', messageSchema);
export default Message;
