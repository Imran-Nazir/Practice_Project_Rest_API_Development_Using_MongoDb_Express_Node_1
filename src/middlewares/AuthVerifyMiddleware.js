var jwt = require('jsonwebtoken');

module.exports = (req, res, next)=>{
    let Token = req.headers['token-key'];
    jwt.verify(Token, "secretKey123", (err, decoded)=>{
        if(err){
            res.status(401).json({status: "Unauthorized", data: err});
        }
        else{
            //Get username from decoded token and add with re headers
            let username =  decoded['data']['Username'];
            req.headers.Username = username;
            next();
        }
    })
}
