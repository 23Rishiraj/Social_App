import Conversation from "../models/conversationModal";

async function sendMessage(req,res) {
    try {
        const { recipientId, message } = req.body;
        const senderId = req.user._id; // Assuming req.user is set by protectRoutes middleware

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, recipientId] }
        });

        if(!conversation) {
            conversation = new Conversation({
                participants: [senderId, recipientId],
                lastMessage: { text: message, sender: senderId }
            });
            await conversation.save();
        }

            const newMessage = ({
                conversionId: conversation._id,
                senderId: senderId,
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
export {sendMessage };