module.exports = {
    login: (req,res,next)=>{
        if(!req.session.user){
            return res.status(401).send("Login First")
        }
        console.log("welcome to Instagram story");
        next();

    }
}
