const router = require('express').Router();
const Message = require('../models/Message');

//add new message
router.post('/', async(req,res)=>{
    const newMessage = new Message(
        {
            "conversationId": req.body.conversationId,
            "senderId": req.body.senderId,
            "senderName": req.body.senderName,
            "text": req.body.text,
            "timeSent": req.body.timeSent
        }
    )
    try {
        const savedMessage = await newMessage.save();
        res.status(201).json(savedMessage);
    } catch (error) {
        res.status(500).json(error);
    }
});

//get message
router.get('/', async(req,res)=>{
    try {
        const messages = await Message.find({
            conversationId: req.query.conversationId
        });
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports = router;