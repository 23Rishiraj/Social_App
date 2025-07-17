import Conversation from "../models/conversationModal.js";
import Message from "../models/messageModal.js";

async function sendMessage(req, res) {
    try {
        const { recipientId, message } = req.body;
        const senderId = req.user._id; // Assuming req.user is set by protectRoutes middleware

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, recipientId] }
        });

        if (!conversation) {
            conversation = new Conversation({
                participants: [senderId, recipientId],
                lastMessage: { text: message, sender: senderId }
            });
            await conversation.save();
        }

        const newMessage = new Message({
            conversionId: conversation._id,
            sender: senderId,
            text: message,
        });

        await Promise.all([
            newMessage.save(),
            Conversation.updateOne({
                lastMessage: { text: message, sender: senderId }
            },)
        ])

        res.status(201).json(newMessage);
    } catch (error) {
        res.status(500).json({ error: error.message });
        coonsole.error("Error in sendMessage:", error);
    }
}

async function getMessages(req, res) {
    const { otherUserId } = req.params;
    const userId = req.user._id; //current user id
    try {
        const conversation = await Conversation.findOne({
            participants: { $all: [userId, otherUserId] }
        })

        if (!conversation) {
            return res.status(404).json({ error: "Conversation not found" });
        }

        const messages = await Message.find({ conversionId: conversation._id })
            .sort({ createdAt: 1 }) // new message at botton on old messages on top
        // .populate('senderId', 'name profilePicture')

        res.status(200).json(messages);

    } catch (error) {
        res.status(500).json({ error: error.message });
        console.error("Error in getMessage:", error);
    }
}

async function getConverations (req, res) {
    const userId = req.user._id; //current user id
    try {
        const conversations = await Conversation.find({ participants: userId }).populate({
            path: "participants",
            select: "username profilePic"
        }).sort({ updatedAt: -1 }); // sort by last updated

        conversations.forEach(conversation => {
            conversation.participants= conversation.participants.filter(
                participant=> participant._id.toString() !== userId.toString()
            );
        })

        res.status(200).json(conversations);

    } catch (error) {
        res.status(500).json({ error: error.message });
        console.error("Error in getConverations:", error);

    }
}
export { sendMessage, getMessages, getConverations };