const express = require('express'); //importing express
var router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
require('dotenv').config();
const upload = require('../helper/multer');
const { login } = require("../helper/session")
const cloudinary = require('cloudinary');
require('../helper/cloudinary');
const bcrypt = require('bcrypt');

//to login 
router.post('/login',async(req,res) =>{ 
    try {
        const username = req.body.username
        const password = req.body.password
        
        const user = await User.findOne({
            username : username
       })

       if(user == null){
           return res.status(400).send('cannot find user')
       }
       
       if(bcrypt.compare(password, user.password)){
            req.session.user = user.username;
            res.send("logged in!!!!!!!!")
           
       }else{
           res.send("Not allowed")
       }
    } catch (err) {
        console.log(err);
        res.send(err)
    }
})

// to add user
router.post('/', upload.single('avatar'), async(req,res) =>{
    try {
        const { email,username,password,bio } = req.body
       
        const avatar = await cloudinary.v2.uploader.upload(req.file.path);
        
                     
        const user = new User();
        user.email = email
        user.username = username
        user.password = password
        user.bio =bio
        user.avatar = avatar.url

        await user.save((err, doc) => {
            if (!err)
                res.json(user)
            else {
                 console.log(err);
            }
        });
    } catch (error) {
        console.log(error);
    }
})

//to get user by id
router.get('/:id',login , async(req, res) => {
    try{
        const id = req.params.id;
        const user=await User.findById(id);
        res.json(user);
    }catch(err){
    res.send(err)
}
}); 


//to get users story
router.get('/story/:id',login , async(req, res) => {
    try{
        const id = req.params.id;
        const user=await User.findById(id).populate('storys');
        res.json(user.storys);
    }catch(err){
    res.send(err)
}
});  


//to get all user
router.get('/',login , async(req, res) => {
    try{
        const user = await User.find();
        res.send(user);
    }catch(err){
    res.send(err)
}
});    


//update user
router.patch('/:id',login , upload.single('avatar'), async(req,res) =>{
    try {
        const id = req.params.id;
        const { email,username,password,bio } = req.body;

        const avatar = await cloudinary.v2.uploader.upload(req.file.path);

        const user= User.findById(id);
        user.email = email
        user.username = username
        user.password = password
        user.bio =bio
        user.avatar = avatar.url;

        await user.save((err, doc) => {
            if (!err)
                res.json(user)
            else {
                 console.log(err);
            }
        });
        
    } catch (err) {
        console.log(err);
        res.send(err);
    }
})

module.exports = router;