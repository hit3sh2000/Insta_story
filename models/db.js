const mongoose = require('mongoose');

//this is for connnecting MongoDB
mongoose.connect('mongodb://localhost:27017/Instagram', { 
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
}, (err) => {
    if (!err) { console.log('MongoDB Connection Succeeded.') }
    else { console.log('Error in DB connection : ' + err) }
});

require('./user');       // requiring Schema     
require('./story');      // requiring Schema     
