const express = require('express');
const router = express.Router();

const { getElections } = require('../controllers/publicController');

router.get('/elections', getElections);//get all elections


module.exports = router;