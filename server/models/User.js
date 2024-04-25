const mongoose = require('mongoose')
// schema for the users
const UserSchema = new mongoose.Schema({
   name:String,
   email:String,
   password:String,
   likedRecipes: [String]
})

const UserModel = mongoose.model("users", UserSchema)

module.exports = UserModel