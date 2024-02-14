//Define user related logics
const users = require('../Models/userSchema');

//JWT
const jwt = require('jsonwebtoken')

//Register logic function
exports.register=async(req,res)=>{
    console.log("inside register function");
    try{
        const{username,email,password} = req.body
        console.log(`${username} ${email} ${password}`);
        const existingUser = await users.findOne({email})
        if(existingUser){
            res.status(402).json("User already exists")
        }
        else{
            const newUser = new users({
                username,email,password,github:"",link:"",profile:""
            })
            await newUser.save()//data saved in mmongoDB
            res.status(200).json("User created successfully")
        }
    }
    catch(err){
        res.status(500).json("Server error" +err.message)
    }  
}

exports.login=async(req,res)=>{
    const{email,password}=req.body
    try{
        const user = await users.findOne({email})
        
        
        if(user){
            if(password==user.password){
            const token = jwt.sign({userId:user._id},"superkey2024") //jwt token
            res.status(200).json({user,token}) //login successfull
            
            console.log(token);
            }
            else{
                res.status(404).json("Incorrect password")
            }
        }
        else{
            res.status(404).json("Incorect password or email")
        }
    }
    catch(err){
        res.status(500).json("server error" +err.message)
    }
}  
