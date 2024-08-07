const express = require("express");
const {getUsers, registerUser,loginUser, getUser} = require('./controller');
const {validateLoginInputs} = require('../../Middleware/validationMiddlewate');

const router = express.Router();

router.post('/',validateLoginInputs,registerUser);
router.post('/login',validateLoginInputs,loginUser);
router.get('/',getUsers);
router.get('/:id',getUser);

module.exports = router;