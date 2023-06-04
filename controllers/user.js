const userModel = require("../models/user");


const getAllUsers=async(req,res)=>{
try{
const user = await userModel.find({},{password:0})
res.status(200).json(user)
}
catch(err){
    res.status(500).json({message:"something went wrong",error:err})
}

};


const getSingleUser=async(req,res)=>{
const {userID}=req.params

try{
    const user = await userModel.findOne({_id:userID},{password:0});
    res.json(user ? user:"Data Not Found");
}catch(err){
    res.status(500).json({message:"something went wrong",error:err})
}
}


const updateUser =async(req,res)=>{
    const {userID}=req.params
    const {password, ...userRest}=req.body
   try{
    const user = await userModel.findByIdAndUpdate(userID,userRest,{new:true})
    res.status(200).json(user)
   }
   catch(err)
   {
    console.log("Something went wrong")
    res.status(500).json({message:"Something went wrong",error:err})
   }
}

const deleteUser = async (req,res)=>{
    const{userID}=req.params
    try{
        const user = await userModel.findByIdAndDelete(userID);
        res.status(200).json(user)
    }
    catch(err){
        console.log("Something went wrong")
        res.status(500).json({message:"Something went wrong",error:err})
    }

}


module.exports={
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser,
}