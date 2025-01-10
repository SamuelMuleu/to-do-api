const express = require('express');
const {CreateServices,getServices,deleteServices} = require('../controllers/servicesControllers');
const router = express.Router();

router.get("/",getServices),
router.post("/",CreateServices),
router.delete("/:id",deleteServices),



module.exports = router;