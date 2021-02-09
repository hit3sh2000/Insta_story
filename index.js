require('./models/db');                       //import MONGODB connction files
const express = require('express');                      // import  express
const session = require('express-session');              // import  express-session               
const bodyparser = require('body-parser');               // import  body-parser                    
const story = require('./controllers/storyController');  // import  storyController                    
const user = require('./controllers/userController');    // import  userController                        
const app = express()                                    //Asigning express               

app.use(bodyparser.urlencoded({
    extended: true                          //Asigning bodyparser
}));
app.use(bodyparser.json());                   //Asigning json of bodyparser

app.get('/', (req, res) => {
  res.send('Hello World');                        //simple route for hello World
});

app.use(session({ 		//Usuage
    secret: 'keyboard cat',
    resave: false,                             //Asigning session  
    saveUninitialized: true,  
  }));

app.use('/user',user);        //  setting router 
app.use('/story',story);      //  setting router 

const PORT = 3000;
app.listen(PORT,console.log(`Port is running on http://localhost:${PORT}`));

