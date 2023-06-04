const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");



const itemSchema = mongoose.Schema({

    name:{
        type:String,
        required:[true,"Name of the item is required."],
        validator: validator.isAlpha
    },
    productionDate:{
        type:String,
        required:[true,"Production date is required."],
    validator: validator.isDate()
    },
       ExpiryDate:{
        type:String,
        required:[true,"Expiry date is required."],
        validator: validator.isDate() 
    },
    productCode:{
        type:String,
        unique:true,
        required:[true,"Product code is required."],
    }

})


const itemModel = mongoose.model('Item',itemSchema);
module.exports=itemModel;