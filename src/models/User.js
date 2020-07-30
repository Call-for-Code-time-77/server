const mongoose = require("mongoose");
const passporLocalMongoose = require("passport-local-mongoose");
const passport = require("passport");

mongoose.Promise = global.Promise;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: "O nome é obrigatório"
  },
  email: {
    type: String,
    trim: true,
    required: "O email é obrigatório"
  },
  cpf: {
    type: String,
    required: "O CPF é obrigatório"
  },
  crp: {
    type: String
  }
});

userSchema.plugin(passporLocalMongoose, { usernameField: "email" });

module.exports = mongoose.model("User", userSchema);
