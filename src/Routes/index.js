const express = require('express');
const {chatRouter} = require('../Controller/chatController');
const {userRouter} = require('../Controller/userController');
const {messageRouter} = require('../Controller/messageController');

const router = express.Router();

router.use('/users', userRouter);
router.use('/chat', chatRouter);
router.use('/message', messageRouter);

module.exports = router;