const express = require("express");
const URL = require("../model/url");

const router = express.Router();


router.get("/", async (req,res)=>{
    const allUser = await URL.find({});
    return res.render("home",{urls:allUser});
})


module.exports = router;