import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: {fileSize: 10*1024*1024}
}).single("image");

const uploadMiddleware = (req, res, next) => {
    upload(req, res, (err) => {
        if (err){
            return res.status(400).json({error: err.message});
        }
        next();
    });
}
export default uploadMiddleware;