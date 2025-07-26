const mongoose=require("mongoose")
require("dotenv").config();

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to database");
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
};

module.exports = connectDb;
