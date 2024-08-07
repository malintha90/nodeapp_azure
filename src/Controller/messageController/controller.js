const messageModel = require('../../Models/messageModel');

const createMessages = async(req, res) => {
    try{
        const {chatId, senderId,text} = req.body;
        const message = new messageModel({chatId, senderId,text});

        await message.save().then(response => {
            return res.status(200).json(response)
        }).catch(error => {
            return res.status(400).json(error)
        })
    }catch(error){
        return res.status(500).json(error)
    }
}

const getMessages = async(req, res) => {
    try{
       const {chatId} = req.params;

       const messages = await messageModel.find({chatId});
       return res.status(200).json(messages)
    }catch(error){
        res.status(500).json(error)
    }
}

module.exports = {createMessages,getMessages}