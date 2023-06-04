const userModel = require("../models/user")
bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const registerUser = async(req,res)=>{
const{email}=req.body;
try{
    const userAvailable = await userModel.findOne({email})

    if(userAvailable)
    {
        return res.status(401).json({message:"Already in database"});
    }

    const user = await userModel.create(req.body);
    res.status(201).json(user);
}
catch(err){
    res.status(500).json({message:"Something went wrong",error:err})
}
}



const loginUser = async(req,res)=>{

    const{password}=req.body;
    try{
        const user = await userModel.findOne({email:req.body.email})
  
        if(user)
        {
            const isValidPassword = await bcrypt.compare(
                password, user.password
            )
      if(isValidPassword)
        {
            const accessToken = jwt.sign(
                {id:user._id, isAdmin:user.isAdmin},
                process.env.JWT_SECRET,
                {expiresIn:"1d"}
            );

            const{password, ...rest}=user._doc;
            
            res.cookie("jwt",accessToken);
            res.json({...rest,accessToken});
        }}
        else{
            res.status(403).json("Email is incorrect");
        }
    }catch(err){
        res.status(500).json({message:"Something went worng", error:err});
    }
    }

module.exports = {
    registerUser,
    loginUser,
}