const mongoose = require('mongoose');  //importing mongoose
const bcrypt = require('bcrypt')       //importing bcrypt


//userSchema for user
var userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    lowercase: true
    
  },
  username: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
    minlength: 3,
  },
  password:String,
  avatar: String,
  bio: {
    type: String,
    maxlength: 130,
  },
  storys: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Story'
    }
  ]
});


userSchema.pre('save', async function(next){
    try{
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(this.password, salt)
        this.password= hashPassword
        next()
    }catch(err){
        console.log(err)
    }
})


mongoose.model('User', userSchema); //exporting schema
