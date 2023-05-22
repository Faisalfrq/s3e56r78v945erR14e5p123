const express = require('express');
const multer = require('multer');
const { uploadCV } = require('../controllers/cv.controller');

const router = express.Router();
const upload = multer();

router.post('/upload', upload.single('cv'), uploadCV);

module.exports = router;
