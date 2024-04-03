const mongoose = require("mongoose")
mongoose.connect(
  "mongodb+srv://sai16111611:Sai161116111611@cluster0.kze9wum.mongodb.net/",
  { dbname: "paymentsdb" }
);
const userschema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minLength: 3,
    maxLength: 30,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },
});
const accountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, // Reference to user model
    ref: "User",
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
});

const Account = mongoose.model("Account", accountSchema);
const User = mongoose.model("User", userschema);
module.exports = {
  Account,
  User,
};
