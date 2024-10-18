const multer = require('multer');

//Helps to define the type of image from its extension and what image file types are valid
const imageTypeMap = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg',
    'image/gif': 'gif',
    'image/svg': 'svg',
    'image/webp': 'webp',
    'image/bmp': 'bmp'
};

const fileUpload = multer({
    limits: 1000000, //The filesize limit (in bytes: 1000000 = 1MB)
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'uploads/images');
        },
        filename: (req, file, cb) => {
            //get the file extension and define the name that the uploaded file will have
            const ext = imageTypeMap[file.mimetype];
            cb(null, 'recipeimage-' + Date.now() + '.' + ext)
        }
    }),
    fileFilter: (req, file, cb) => {
        const isValid = !!imageTypeMap[file.mimetype];
        let error = isValid ? null : new Error('Invalid image file type!');
        cb(error, isValid);
      }
});

module.exports = fileUpload;