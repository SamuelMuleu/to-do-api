const express = require('express');
const {CreateServices,getServices,deleteServices,updateServices} = require('../controllers/servicesControllers');
const router = express.Router();

router.get("/",getServices),
router.post("/",CreateServices),
router.delete("/:id",deleteServices),
router.patch("/:id",updateServices),



module.exports = router;