// jobCategoryController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getJobCategories = async (req, res) => {
  try {
    const jobCategories = await prisma.job_category.findMany({
      include: { job: true },
    });
    res.json(jobCategories);
  } catch (error) {
    console.error('Error retrieving job categories:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getJobCategoryById = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const jobCategory = await prisma.job_category.findUnique({
      where: { id },
      include: { job: true },
    });

    if (!jobCategory) {
      return res.status(404).json({ error: 'Job category not found' });
    }

    res.json(jobCategory);
  } catch (error) {
    console.error('Error retrieving job category by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.createJobCategory = async (req, res) => {
  const { nama_category, jobId } = req.body;

  try {
    const createdCategory = await prisma.job_category.create({
      data: {
        nama_category,
        job: {
          connect: { id: jobId }
      }
      },
    });

    res.json(createdCategory);
  } catch (error) {
    console.error('Error creating job category:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


exports.updateJobCategory = async (req, res) => {
  const { id } = req.params;
  const { nama_category, jobId } = req.body;

  try {
    const updatedCategory = await prisma.job_category.update({
      where: { id: parseInt(id) },
      data: {
        nama_category,
        job: {
          connect: { id: jobId }
        }
      },
    });

    res.json(updatedCategory);
  } catch (error) {
    console.error('Error updating job category:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


exports.deleteJobCategory = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.job_category.delete({
      where: { id: parseInt(id) },
    });

    res.json({ message: 'Job category deleted successfully' });
  } catch (error) {
    console.error('Error deleting job category:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};