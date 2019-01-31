const multer = require('multer');
const fs = require('fs');

module.exports = {

    upload: function()
    {
        const storage = multer.diskStorage({
            destination: function (req, file, cb) {
                    // fs.mkdirSync('./uploads/');
                    cb(null, './uploads/');
            },
            filename: function (req, file, cb) {
                cb(null, Date.now() + '_' + Math.random().toString(36).substring(2, 15) + '.jpg')
            }
        });

        const fileFIlter = (req, file, cb) => {
            if (!file.originalname.match(/\.(jpg|jpeg|JPG|png|PNG|bmp)$/)) {
                return cb(new Error('Only image files are allowed!'), false);
            }
            cb(null, true);
        };

        return multer({
            storage: storage,
            fileFilter: fileFIlter
        });
    }
};
