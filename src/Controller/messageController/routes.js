const express = require('express');
const {createMessages, getMessages} = require('./controller');

const router = express.Router();

router.get('/:chatId',getMessages);
router.post('/', createMessages);

module.exports = router;