const router = require('express').Router();
const User = require('../models/User');

//add new user
router.post('/', async(req,res)=>{
    const { name } = req.body;
    const newUser = await User.create({ name });
    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json(error);
    }
});

//get user by name

router.get('/', async(req,res)=>{
    try {
        const user = await User.find(
            {
                name: req.query.name
            }
        );
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json(error);
    }
});

//get all users

router.get('/all', async(req,res)=>{
    try {
        const user = await User.find();
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json(error);
    }
});


module.exports = router;