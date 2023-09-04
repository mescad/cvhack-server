const express = require('express');
const router = express.Router();
const ApiController= require ('../controllers/api-controllers')


router.route('/api')
.post(ApiController.getCV)
.get(ApiController.checkAPI)

router.route('/api/refine')
.post(ApiController.refineAnswer)



module.exports= router