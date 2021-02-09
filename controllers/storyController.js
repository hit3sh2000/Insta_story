const express = require('express'); //importing express
var router = express.Router();
const mongoose = require('mongoose');
const Story = mongoose.model('Story');
const User = mongoose.model('User');
const { login } = require("../helper/session")
require('dotenv').config();
require('../helper/cloudinary');
const upload = require('../helper/multer');
const cloudinary = require('cloudinary');
const { getVideoDurationInSeconds } = require('get-video-duration')


//to add story of user
router.post('/:id', upload.single('content'), async(req,res) => {
    try {
        const uid = req.params.id;
        const { caption,hashtags } =req.body;
        var check = 0;
        await
        getVideoDurationInSeconds(req.file.path).then((duration) => {
            if(duration >30){
                console.log("video length is greater than 30 sec");
                res.send("video length is greater than 30 sec")
                check= 0;
            return
            }else if (duration <= 30){
                console.log("done!!!!");
                check = 1;
                 
            }
        })
        if(check = 1){
            const result = await cloudinary.v2.uploader.upload(req.file.path,
            {resource_type: "video"});

            const story = new Story();
            story.content =result.secure_url;
            story.caption=caption;
            story.hashtags=hashtags;
            story.users = uid;

            await story.save(async(err,docs)=>{
                if(!err){
                    res.json(story);
                    const userById = await User.findById(uid); 
                    userById.storys.push(story);
                    await userById.save();
                }
                else{res.json(err)}
            })            
        }else{console.log("error while saving story")}

        

    } catch (error) {
        console.log(error);
        res.send(error)
    }
})

//to get all story  
router.get('/',login , async(req, res) => {
    try{
        const story = await Story.find();
        res.send(story);
    }catch(err){
    res.send(err)
}
    
});

//user is viewing story
router.get('/:uid/:sid',login ,async(req,res)=>{
    
    try {
        const uid =req.params.uid;
        const sid =req.params.sid;
        // console.log(uid,sid);
        let check = 0;
      const story = await Story.findById(sid);
      story.counts = story.counts + 1;

      story.viewBy.forEach((item)=>{
          console.log(item,uid);
        if (item == cid){
            check = 1;
        }else{
            check = 0;
        }
    })

        if(check == 0 ){
          const story1 =  await story.viewBy.push(uid) 
            console.log("add viewby");
            res.send(story1)
    
        }else{
            console.log("viewby has this user id");
            res.json({
                message:"viewby has this user id",
                story:story
            })
        }
        const s1 = story.save((err,docs) =>{
          if(!err){
              console.log("done");
          }else{
              console.log("not done"+err);
              res.send(err)
          }
      });
        res.json(s1)
      
    } catch (err) {
        console.log(err);
        res.send(err);
    }
})


module.exports = router;