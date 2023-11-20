const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const createApplication = async (req, res) => {
    try {
        const { tgl_pengajuan, status, jobId, adminId } = req.body;

        // Check if required fields are provided
        if (!tgl_pengajuan || !status || !jobId || !adminId) {
            return res.status(400).json({ error: 'Incomplete data. Please provide all required fields.' });
        }

        // Check if the provided status is valid
        if (status !== 'confirm' && status !== 'confirmed') {
            return res.status(400).json({ error: 'Invalid status. Status should be "confirm" or "confirmed".' });
        }

        // Create a new application
        const application = await prisma.application.create({
            data: { tgl_pengajuan, status, jobId, adminId },
        });


        res.status(201).json(application); // 201 indicates successful creation
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Read all applications
const getAllApplications = async (req, res) => {
    try {
        const applications = await prisma.application.findMany();
        res.json(applications);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getApplicationById = async (req, res) => {
    try {
        const { id } = req.params;
        const application = await prisma.application.findUnique({
            where: { id: parseInt(id) },
        });

        if (!application) {
            return res.status(404).json({ error: 'Application not found.' });
        }

        res.json(application);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Update application by ID
const updateApplication = async (req, res) => {
    try {
        const { id } = req.params;
        const { tgl_pengajuan, status, jobId, adminId } = req.body;

        // Check if the application exists
        const existingApplication = await prisma.application.findUnique({
            where: { id: parseInt(id) },
        });

        if (!existingApplication) {
            return res.status(404).json({ error: 'Application not found.' });
        }

        // Update the application
        const updatedApplication = await prisma.application.update({
            where: { id: parseInt(id) },
            data: { tgl_pengajuan, status, jobId, adminId },
        });

        res.json(updatedApplication);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Delete application by ID
const deleteApplication = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if the application exists
        const existingApplication = await prisma.application.findUnique({
            where: { id: parseInt(id) },
        });

        if (!existingApplication) {
            return res.status(404).json({ error: 'Application not found.' });
        }

        // Delete the application
        await prisma.application.delete({
            where: { id: parseInt(id) },
        });

        res.json({ message: 'Application deleted successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


module.exports = {
    createApplication,
    getAllApplications,
    getApplicationById,
    updateApplication,
    deleteApplication,
};

