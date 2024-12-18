const jwt = require("jsonwebtoken");

const secretKey="Aryan123@"

async function generateCookieForAdmin(user){

    const payload={username:user.username,role:"admin"}
    return await jwt.sign(payload,secretKey);

}


async function generateCookieForcollector(user){

    const payload={username:user.username,role:"collector"}
    return await jwt.sign(payload,secretKey);

}


async function verifyCookie(cookie){
    if(!cookie) return null;
    try{
        return await jwt.verify(cookie,secretKey)
    }
    catch{
        return null;
    }
}

module.exports={generateCookieForAdmin,generateCookieForcollector,verifyCookie}