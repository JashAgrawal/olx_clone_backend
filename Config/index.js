const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
const connectDB = () => {
  try {
    const conection = mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected Succesfully`);
    return conection;
  } catch (err) {
    console.log(err.code);
  }
};

module.exports = connectDB;
