const express = require('express');
const StudieController = require('../controllers/StudiesController');

const router = express.Router();

router.get('/', StudieController.getStudies);

module.exports = router;