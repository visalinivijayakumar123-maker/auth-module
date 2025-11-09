const express = require("express");
const {registerUser,loginUser,getProfile}=require("../controllers/autoController");
const authMiddleware=require("../middlewares/authMiddleware");
const router=express.Router();
router.post("/register",registerUser);
router.post("/login",loginUser);
router.get("/getProfile",authMiddleware,getProfile);
module.exports=router;