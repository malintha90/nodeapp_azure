const validator = require('validator');

const validateLoginInputs = (req, res, next) => {
    try {
        const {name, email, password} = req.body;
        if(name !=="" && email!==""  && password!=="" ){           
            if(!validator.isEmail(email)) return res.status(400).json({status: 400, message:"Invalied email"});
            if(!validator.isStrongPassword(password)) return res.status(400).json({status: 400, message:"Password must be a strong password"});        
        }else{
            return res.status(400).json({status: 400, message:"All fields required!.."})
        }

        next();
    }catch(error){
        return res.status(400).json(error)
    }
}

module.exports = {validateLoginInputs}