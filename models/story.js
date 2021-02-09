const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const StorySchema = new  mongoose.Schema({
    content:{
        type: String,
        required: true,
    },
    caption:{
        type: String,
        required: true,
    },
    hashtags:{
        type: String,
        required: true,
    },
    users:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    viewBy:[{
        type:  mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    counts:{
        type:Number,
        default:0
    }

  },{timestamps:true});
  

  
  const Story = mongoose.model('Story', StorySchema);
  module.exports = Story;
  