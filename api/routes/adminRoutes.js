const express = require('express');
const adminControllers = require("../controllers/adminControllers");

const router = express.Router();

router.post('/', adminControllers.newAdmin);
router.get('/', adminControllers.get);
router.get('/:id', adminControllers.getAdminById);
router.put('/:id', adminControllers.updateAdminById);
router.delete('/:id', adminControllers.delete);

module.exports = router;