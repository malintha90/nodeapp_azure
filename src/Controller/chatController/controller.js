
const chatModel = require('../../Models/chatModel');

const getUserChats = async(req, res) => {
    try{
        const userId = req.params.id;

        const response = await chatModel.find({
            members:{$in: [userId]}
        })
        return res.status(200).json({ststus:200, response});

    }catch(error){
        return res.status(500).json({ststus:500, message: error.message})
    }
}

const findUserChat = async(req, res) => {
    try{
        const {firstId, secondId} = req.params;

        const response = await chatModel.findOne({
            members:{$all: [firstId, secondId]}
        })
        return res.status(200).json({ststus:200, response});

    }catch(error){
        return res.status(500).json({ststus:500, message: error.message})
    }
}


const createChat = async(req, res) => {
    try{
        const {senderId, reserverId} = req.body;
        const chatresult = await chatModel.findOne({
            members: {$all: [senderId, reserverId]} // fetch contain both ids
        });

        if(chatresult){
            return res.status(200).json(chatresult);
        }else{
            createNew = new chatModel({members:[senderId, reserverId]});
            
            await createNew.save().then((responseCreateNew) => {            
                return res.status(200).json({ststus:200, responseCreateNew});
            }).catch((error) => {
                return res.status(400).json(error);
            });       

        }
       
    }catch(error){
        return res.status(500).json({ststus:500, message: error.message})
    }
   
}

module.exports = {getUserChats, createChat, findUserChat}

