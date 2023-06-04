const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: "Email is not valid",
    },
  },

  password: {
    type: String,
    required: [true, "Password is required"],
    unique: true,
    validate: {
      validator: validator.isStrongPassword,
      message: "Email is not valid",
    },
  },

  isAdmin:{
    type: Boolean,
    default: false,
  },

  name:{
    type:String,
    required:[true, "Enter full name"],
    validator: validator.isAlpha
  }
});



userSchema.pre('save',async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password,salt)
    next();
})


const userModel = mongoose.model('User',userSchema);
module.exports=userModel;
