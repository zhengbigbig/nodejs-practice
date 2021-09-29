const express = require('express');
const router = express.Router();

/* GET home page. */
import {RequestHandler} from 'express-serve-static-core';

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
} as RequestHandler);

module.exports = router;
