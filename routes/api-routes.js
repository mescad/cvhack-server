const express = require('express');
const router = express.Router();
const ApiController= require ('../controllers/api-controllers')

router.route('/api')
.post(ApiController.getCV)
.get(ApiController.checkAPI)



module.exports= router