
const express = require("express");
const urlRoute = require("./router/url");
const { connectionToMongoDB } = require("./connection");
const {restrictToLoginUserOnly,checkAuth} = require('./middleware/auth');
const URL = require('./model/url');
const path = require("path");
const staticRoute = require("./router/staticRouter");
const userRoute = require("./router/user");
const cookiePaese = require('cookie-parser');

const app = express();
const PORT = 8001;

connectionToMongoDB("mongodb://127.0.0.1:27017/shorturl").then(()=> console.log("MongoDb connected successfully!"));

app.set("view engine","ejs");

app.set("views",path.resolve("./views"));


app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookiePaese());

app.use("/url" ,restrictToLoginUserOnly,urlRoute);
app.use("/user",userRoute);
app.use("/", checkAuth,staticRoute);

app.get("/test",async(req,res) =>{
    const allUrl = await URL.find({});
    return res.render("home",{urls:allUrl});
})

app.get('/url/:shortId', async (req,res) =>{
    const shortId = req.params.shortId;
   const entry =  await URL.findOneAndUpdate({
        shortId
    },{
        $push:{
            visiHistory:{
                timestamp:Date.now(),
            },
        }
    });

    res.redirect(entry.redirectURL);
})

app.listen(PORT,()=> console.log(`Server started at PORT ${PORT}`))

