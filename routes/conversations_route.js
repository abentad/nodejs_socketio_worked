const router = require('express').Router();
const Conversation = require('../models/Conversation');

//new conversation

router.post('/', async (req,res)=>{
    const newConversation = new Conversation({
        members: [
            req.body.senderId,
            req.body.receiverId
        ]
    });

    try {
        const savedConversation =  await newConversation.save();
        res.status(201).json(savedConversation);
    } catch (error) {
        res.status(500).json(error);
    }
});


//get conversation of a user

router.get('/', async (req,res)=>{
    try {
        const conversation = await Conversation.find({
            members: { $in: [req.body.userId] }
        });
        res.status(200).json(conversation);
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;