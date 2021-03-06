const express = require('express');
 
const homeController = require("../controllers/home")
 
const router = express.Router();

router.get('/',homeController.showCalculator);

router.post('/calculate',homeController.postCalculator)
  
module.exports = router;