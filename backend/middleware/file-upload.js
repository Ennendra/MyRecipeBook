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

//Storing fileuploads as memorystorage (marked as a 'buffer'), which will then be used to send to the imgur API
const storage = multer.memoryStorage();
const fileUpload = multer({
    limits: 1000000, //The filesize limit (in bytes: 1000000 = 1MB)
    storage: storage, //Using the file buffer as the storage before online upload
    fileFilter: (req, file, cb) => { 
        const isValid = !!imageTypeMap[file.mimetype];
        let error = isValid ? null : new Error('Invalid image file type!');
        cb(error, isValid);
    }
});

module.exports = fileUpload;