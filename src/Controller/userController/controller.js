const userModel = require('../../Models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const getUsers = async(req, res) => {
   try{
    const users = await userModel.find();
    res.status(200).json({ status: 200,users});
   }catch(error){
    res.status(500).json(error);
   }
}

const getUser = async(req, res) => {
    try{
    const userId = req.params.id
     const user = await userModel.findById(userId);
     res.status(200).json({ status: 200,user});
    }catch(error){
     res.status(500).json(error);
    }
 }

const generateToken = (_id, name) => {
    const jwtKey = process.env.JWT_SECRET_KEY;

    return jwt.sign({ _id, name }, jwtKey, { expiresIn: "3d" });

}
const registerUser = async (req, res) => {

    try {
        const { name, email, password } = req.body;
        let user = await userModel.findOne({ email });

        if (!user) {

            user = new userModel({ name, email, password });
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);

            await user.save().then((result) => {

                const token = generateToken(result._id, name);
                res.status(200).json({ status: 200, _id: result._id, name, email, token, message:"Register success"});

            }).catch((error) => {
                res.status(400).json(error);
            })

        } else {
            res.status(400).json({status: 400, message:"User already exist"});
        }
    } catch (err) {
        res.status(500).json(err);
    }
}

const loginUser = async(req, res) => {
    try{
        const {email, password} = req.body;

        let user = await userModel.findOne({email});
        
        if(user) {
           
            const isValidPassword =  await bcrypt.compare(password, user.password);  
           
            if(isValidPassword){
                const token = generateToken(user._id, user.name);
                res.status(200).json({ status: 200, _id: user._id, name: user.name, email, token, message:"Register success"});
            }else{
                return res.status(400).json({status: 400, message:"Invalied username or password"})
            }
        }else{
            return res.status(400).json({status: 400, message:"Invalied username or password"})
        };

    }catch(error){
        res.status(500),json(error)
    }
    


}

module.exports = { getUsers, registerUser, loginUser, getUser }