const mongoose = require('mongoose');
const dotenv = require('dotenv')

dotenv.config();

const mongoose_link = process.env.MONGO_DB_LINK 

const connectDB = async () => {
    try {
        const connect = mongoose.connect(mongoose_link, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        })
        console.log("Mongo DB connected successfully")
    }catch(err){
        console.log(`Error: ${err}`)
        process.exit(1)
    }
}

module.exports = connectDB;