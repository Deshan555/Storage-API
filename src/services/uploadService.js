const logger = require('../config/logger');
const path = require("path");
const { errorResponse, successResponse } = require('../utils/responseUtils');

const uploadService = {
    handleFileUpload(req, res) {
        try {
            if (!req.file) {
                logger.error('No file uploaded.');
                errorResponse(res, 'No file uploaded.', 400)
            }
            const downloadLink = `${req.protocol}://${req.get('host')}/thaprobane/files/v01/download/${req.file.filename}`;
            logger.info('File uploaded successfully.');
            successResponse(res, 'File uploaded successfully', { file: req.file, downloadLink })
        } catch (error) {
            logger.error('Error uploading file: ', error.message);
            errorResponse(res, 'Error uploading file : ' + error.message, 500);
        }
    },
    downloadFile(req, res) {
        try{
            const filename = req.params.filename;
            if (!filename) {
                logger.error('Cannot download file without filename, File Name Required');
                errorResponse(res, 'Cannot download file without filename, File Name Required', 400);
            }
            const fileExtension = filename.split('.').pop();
            console.log('fileExtension', fileExtension);
            let filePath = path.join(__dirname, './../../uploads/other/', filename);
            if (!fileExtension) {
                logger.error('Cannot download file without file extension, File Extension Required');
                errorResponse(res, 'Cannot download file without file extension, File Extension Required', 400);
            } else if (fileExtension === 'pdf' || fileExtension === 'docx'
                || fileExtension === 'xlsx' || fileExtension === 'pptx' || fileExtension === 'txt'
                || fileExtension === 'csv' || fileExtension === 'xls' || fileExtension === 'ppt') {
                filePath = path.join(__dirname, './../../uploads/docs/', filename);
            } else if (fileExtension === 'png' || fileExtension === 'jpg' || fileExtension === 'jpeg' || fileExtension === 'gif') {
                filePath = path.join(__dirname, './../../uploads/images/', filename);
            } else {
                filePath = path.join(__dirname, './../../uploads/other/', filename);
            }
            res.download(filePath, (err) => {
                if (err) {
                    logger.error('Error downloading file:', err.message);
                    console.error('Error downloading file:', err.message);
                }
            });
        } catch (error) {
            logger.error('Error downloading file: ', error.message);
            errorResponse(res, 'Error downloading file : ' + error.message, 500)
        }
    }
};

module.exports = uploadService;
