import multer from "multer"

const storage = multer.diskStorage({
    filename:function(req,file,cb){
        cb(null , file.originalname)
    }
})

const uplaod = multer({storage})

export default uplaod