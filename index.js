
const express = require("express");
const urlRoute = require("./router/url");
const { connectionToMongoDB } = require("./connection");
const URL = require('./model/url');

const app = express();
const PORT = 8001;

connectionToMongoDB("mongodb://127.0.0.1:27017/shorturl").then(()=> console.log("MongoDb connected successfully!"));

app.use(express.json());

app.use("/url",urlRoute);

app.get('/:shortId', async (req,res) =>{
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

