const express = require('express');
const {handlegenerateNewShoetURL,handlegetanalytics} = require('../controller/url');
const router = express.Router();


router.post("/",handlegenerateNewShoetURL);

router.get('/analytics/:shortId',handlegetanalytics);


module.exports = router;