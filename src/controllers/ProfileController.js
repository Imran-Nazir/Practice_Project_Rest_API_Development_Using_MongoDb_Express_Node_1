const ProfileModel = require('../models/ProfileModel');
var jwt = require('jsonwebtoken');

exports.CreateProfile = (req, res)=>{
    let reqBody = req.body;

    ProfileModel.create(reqBody).then((data)=>{
        res.status(200).json({status:"OK", data: data})
    }).catch((err)=>{res.status(401).json({status:"Failed", data: err.toString()})})
}

exports.UserLogin = (req, res)=>{
    let username = req.body['username'];
    let password = req.body['password'];
    //res.status(200).json({status:"OK", data: {username, password}})

    ProfileModel.find({Username:username, Password:password}).then((data, err)=>{
        if(err){res.status(400).json({status:"Failed", data: err})}
        else{
            if(data.length > 0){   
                let Payload = {
                    exp: Math.floor(Date.now() / 1000) + (24*60*60), //1 hour
                    data: data[0]
                }
                let token = jwt.sign(Payload, "secretKey123");
                res.status(200).json({status:"Ok", token: token, data: data});        
        }
            else{res.status(401).json({status:"Unauthorized!"})}
        }
    })
}

exports.SelectProfile = (req, res)=>{
    let username = req.headers['Username'];
    let Projection = "Email MobileNumber City";
    ProfileModel.find({Username:username}, Projection).then((data)=>{
        res.status(200).json({status:"OK", data: data})
    }).catch((err)=>{res.status(400).json({status:"Fail", data:err})})
}

exports.UpdateProfile = (req, res)=>{
    let username = req.headers['Username'];
    let Query = {Username:username};
    let reqBody = req.body;
    
    ProfileModel.updateOne(Query, {$set:reqBody}, {upsert:true}).then((data)=>{
        res.status(203).json({status:"Updated", data: data});
    }).catch((err)=>{res.status(400).json({status:"Fail", data: err})})
}