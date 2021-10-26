const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
    {
        conversationId: {
            type: String
        },
        senderId: {
            type: String
        },
        senderName: {
            type: String
        },
        text: {
            type: String
        },
        timeSent: {
            type: Date
        }
    }
);

module.exports = mongoose.model('Message', messageSchema);