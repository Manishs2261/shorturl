const ShortUniqueId = require('short-unique-id');
const URL = require('../model/url');

async function handlegenerateNewShoetURL(req,res){
const body = req.body;
if(!body.url) return res.status(400).json({error: 'url is required'});
const uid = new ShortUniqueId({ length: 10 });
const shortIdString = uid.randomUUID();
await URL.create({
    shortId:shortIdString,
    redirectURL:body.url,
    visiHistory:[],
});
return res.render("home",{id:shortIdString});

    
}


async function handlegetanalytics(req,res){

const shortId = req.params.shortId;
const result = await URL.findOne({shortId});

return res.json({totalClicks:result.visiHistory.length,analytics: result.visiHistory});
}

module.exports = {
    handlegenerateNewShoetURL,
    handlegetanalytics,
}