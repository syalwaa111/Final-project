const express = require('express');
const router = express.Router();
const userEducationHistoryController = require('../controllers/userEducationHistoryController');

router.post('/user-education-histories', userEducationHistoryController.createUserEducationHistory);
router.get('/user-education-histories', userEducationHistoryController.getUserEducationHistories);
router.get('/user-education-histories/:id', userEducationHistoryController.getUserEducationHistoryById);
router.put('/user-education-histories/:id', userEducationHistoryController.updateUserEducationHistory);
router.delete('/user-education-histories/:id', userEducationHistoryController.deleteUserEducationHistory);

module.exports = router;
