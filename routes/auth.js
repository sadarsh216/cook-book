const router = require("express").Router();
const { validateRegistration }= require("../middleware/validation") 
const user = require("../models/userSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


router.post("/register", async (req,res) =>{
    let userData = req.body;
    const salt_rounds = 8;
    const {error} = validateRegistration(userData);
    const user_exists = await user.findOne({email:req.body.email}).exec();
    if(error) return res.status(400).send(error.details[0].message);
    else if (user_exists) return res.status(400).send({msg:"An account with given email already exists"});
    else{
        bcrypt.hash(userData.password, salt_rounds).then(hash =>{
            userData.password = hash;
            user.create(userData,(err, data) =>{
                if (err) {
					res.status(500).send(err);
				} else {
					res.status(201).send({ _id: data._id });
				}
            })
        })
    }
})

router.post("/login", async(req,res) =>{
    const _user = await user.findOne({email:req.body.email}).exec();
    if(!_user) return res.status(400).send({msg:"User doesnot exists"})
    else{
        bcrypt.compare(req.body.password, _user.password).then(result =>{
            if(result){
                const token = jwt.sign({
                    _id:_user._id,
                    firstname:_user.firstname,
                    lastname:_user.lastname,
                    email:_user.lastname,
                    fullname:_user.firstname+" "+_user.lastname,
                },process.env.JWT_SECRET_TOKEN);
                res.header("auth-token", token).send(token);
            }else {
                res.status(400).send("Wrong Password");
            }
        })
    }
})
module.exports = router;    