import mongoose from 'mongoose';
import Conversion from '../../frontend/src/components/Conversion';

const messageSchema = new mongoose.Schema({
    conversionId: {type:mongoose.Schema.Types.ObjectId, ref: 'Conversion'},
    senderId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    text: String,
},{timestamps: true});

const Message = mongoose.model('Message', messageSchema);
export default Message;
