const mongoose = require('mongoose');

const URI = "mongodb+srv://swaddle:SWADDLE@cluster0-3oan8.mongodb.net/test?retryWrites=true&w=majority";
const connectDB = async () => {
    await mongoose.connect(URI, { useUnifiedTopology: true, useNewUrlParser: true })
    console.log("connnected...!")
}
module.exports = connectDB;
// frgdwozZmdSpCk9s