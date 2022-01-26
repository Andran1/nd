require('dotenv').config()
const mongoose = require('mongoose')

const db = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log('connected to db');
    } catch (error) {
        console.log(error);
    }
}

module.exports = db