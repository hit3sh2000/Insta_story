const multer = require('multer');


module.exports = multer({

    storage: multer.diskStorage({}),
    fileFilter:(req,file,cb) =>{
        // if(!file.mimetype.match(/mp4|MOV|WMV|AVI|AVCHD|MKV|MPEG-2$i/)){
        //     cb(new Error("File is not supported"), false)
        //     return
        // }
        cb(null, true)
        
    }
})

