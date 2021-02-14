const mongoose = require("mongoose");
const colors = require("colors");

const connectDB = async () => {
  try{
    const connection = await mongoose.connect(
      "mongodb://localhost:27017/proshop",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
      });

    console.log(`DB connected: ${connection.connection.host}`.underline.green)
  } catch (err) {
    console.error(`Error: ${err}`.red);
    process.exit(1);
  }
}

module.exports = connectDB;
