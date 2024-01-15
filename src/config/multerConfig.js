const multer = require('multer');
const logger = require('./logger');

const storageConfig = multer.diskStorage({
    destination: (req, file, cb) => {
        try {
            if(file.mimetype === 'image/jpeg'
                || file.mimetype === 'image/png'
                || file.mimetype === 'image/gif'
                || file.mimetype === 'image/svg+xml'
                || file.mimetype === 'image/webp'
                || file.mimetype === 'image/tiff') {
                cb(null, 'uploads/images');
            } else if(file.mimetype === 'application/pdf'
                || file.mimetype === 'application/msword'
                || file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
                || file.mimetype === 'application/vnd.ms-excel'
                || file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                || file.mimetype === 'application/vnd.ms-powerpoint'
                || file.mimetype === 'application/vnd.openxmlformats-officedocument.presentationml.presentation') {
                cb(null, 'uploads/docs');
            } else {
                cb(null, 'uploads/other');
            }
        } catch (error) {
            cb(error, null);
            logger.error("Error With Multer Config : " + error);
        }
    },
    filename: (req, file, cb) => {
        try {
            const fileExt = file.originalname.split('.')[1];
            const filename = file.originalname.replace(/\s/g, '');
            const fileNameWithoutExtension = filename.replace(/\.[^/.]+$/, '');
            const uploadFileName = `${fileNameWithoutExtension}-${Date.now()}.${fileExt}`;
            cb(null, uploadFileName);
        } catch (error) {
            cb(error, null);
            logger.error("Error With Multer Config : " + error);
        }
    }
});

const upload = multer({ storage: storageConfig });

module.exports = upload;