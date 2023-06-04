const express = require("express")

const{
getAllItems,
getSingalItems,
updateItems,
deleteItems,
getPost} = 
require("../controllers/item")

const router= express.Router();

router.post("/",getPost);
router.get("/",getAllItems);
router.get("/:ID",getSingalItems)
router.patch("/:ID",updateItems)
router.delete("/:ID",deleteItems)







module.exports=router;
