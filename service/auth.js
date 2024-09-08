const jwt = require("jsonwebtoken");
const secret = "Manish@00"

const sessionIdToUserMap = new Map();

function setUser(user){
    // sessionIdToUserMap.set(id,user);
  return jwt.sign(
    {
        _id:user.id,
        email:user.email,
    },secret);
}

function getUser(token){

    if(!token) return null;

    try{

        return jwt.verify(token,secret);
    }catch (error){

        return null;
    }
    
}


module.exports ={
    setUser,
    getUser
}