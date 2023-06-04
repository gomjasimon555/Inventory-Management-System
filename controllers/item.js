
const Item = require("../models/Item");

const getPost =async(req,res)=>{
const{productCode}= req.body;
 
    try {

      const itemAvailable = await Item.findOne({productCode});
      
      if(itemAvailable)
      {
        return res.status(401).json({ message: "Already in database" });
      }
          const user = await Item.create(req.body);
          res.status(201).json(user);
        } catch (err) {
          res.status(500).json({ message: "something went wrong", error: err });
        }
        
}
const getAllItems = async (req,res)=>{
    try{
      const items = await Item.find();
      res.status(200).json(items);
    
    }
    catch(err){
      res.status(500).json({message: "something went wrong", error:err})
    }
    
    };
    
    
    const getSingalItems = async (req,res)=>{
      const{ID}= req.params;
      
      try{
      const item = await Item.findOne({_id: ID});
      res.json(item ? item :"Data Not Found");
      
      }
      catch(err){
        res.status(500).json({message: "something went wrong", error:err})
      }
    
    
    
      };
      
        const updateItems= async(req, res) => {
    
          const { ID }= req.params;
          const {password, ...userRest}= req.body;
        try{
           const user = await Item.findByIdAndUpdate(ID, userRest,{new:true});
           res.status(200).json(user)
       
          }catch(err){
           console.log("Something went wrong");
           res.status(500).json({message:"Something went wrong",error: err});
          }
        }
      
      
        const deleteItems= async (req, res) => {
    
          const { ID }= req.params;
        try{
           const user = await Item.findByIdAndDelete(ID);
           res.status(200).json(user)
       
          }catch(err){
           console.log("Something went wrong");
           res.status(500).json({message:"Something went wrong",error: err});
          }
        }


        module.exports = {
   getAllItems,
    getSingalItems,
    updateItems,
   deleteItems,
   getPost
        }