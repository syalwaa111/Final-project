const express = require('express');
const jobCategoryController = require("../controllers/jobCategoryController");

const router = express.Router();

router.get('/', jobCategoryController.getJobCategories);
router.get('/:id', jobCategoryController.getJobCategoryById);
router.post('/', jobCategoryController.createJobCategory);
router.put('/:id', jobCategoryController.updateJobCategory);
router.delete('/:id', jobCategoryController.deleteJobCategory);

module.exports = router;

