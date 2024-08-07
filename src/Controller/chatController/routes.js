const express = require('express');
const {getUserChats, createChat, findUserChat} = require('./controller');

const router = express.Router();

router.post('/', createChat);
router.get('/:id', getUserChats);
router.get('/find/:firstId/:secondId', findUserChat);

module.exports = router;