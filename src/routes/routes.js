const express = require('express');
const router = express.Router();
const uploadService = require('../services/uploadService');
const upload = require('../config/multerConfig');

router.post('/upload', upload.single('file'), uploadService.handleFileUpload);
router.get('/download/:filename', uploadService.downloadFile);

module.exports = router;
