const mongoose = require("mongoose");

const connectToDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("database connected successfully")
    } catch (e) {
        console.log('something went wrong trying to connect to the database')
        console.log(e)
        process.exit(1)
    }
}

module.exports = connectToDb;