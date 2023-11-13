// jobCategoryController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getJobCategories = async (req, res) => {
  try {
    const jobCategories = await prisma.job_category.findMany({
      include: { jobId: true },
    });
    res.json(jobCategories);
  } catch (error) {
    console.error('Error retrieving job categories:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getJobCategoryById = async (req, res) => {
  const { id } = req.params;
  try {
    const jobCategory = await prisma.job_category.findUnique({
      where: { id_job_category: parseInt(id) },
      include: { jobId: true },
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
  const { nama_category, jobs } = req.body;

  try {
    const createdCategory = await prisma.job_category.upsert({
      where: { nama_category },
      update: {},
      create: {
        nama_category,
        jobId: {
          create: jobs,
        },
      },
      include: { jobId: true },
    });

    res.json(createdCategory);
  } catch (error) {
    console.error('Error creating job category:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.updateJobCategory = async (req, res) => {
  const { id } = req.params;
  const { nama_category, jobs } = req.body;

  try {
    const updatedCategory = await prisma.job_category.upsert({
      where: { id_job_category: parseInt(id) },
      update: {
        nama_category,
        jobId: {
          upsert: jobs.map((job) => ({
            where: { id: job.id || undefined },
            update: job,
            create: job,
          })),
        },
      },
      create: {
        nama_category,
        jobId: {
          create: jobs,
        },
      },
      include: { jobId: true },
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
      where: { id_job_category: parseInt(id) },
    });

    res.json({ message: 'Job category deleted successfully' });
  } catch (error) {
    console.error('Error deleting job category:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


