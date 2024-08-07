const mongoose = require('mongoose');


const Connection = async(MONGOUURL) => {   
    await mongoose.connect(MONGOUURL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => 
        console.log("MongoDB connection success"))
    .catch((error) => 
        console.log(error))
}

module.exports = Connection;