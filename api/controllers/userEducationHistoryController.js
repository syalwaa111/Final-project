const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createUserEducationHistory = async (req, res) => {
    const { pendidikan_terakhir, tahun_mulai, tahun_selesai, nilai, organisasi, userId } = req.body;
    try {
        const createdEducationHistory = await prisma.user_education_history.create({
            data: {
                pendidikan_terakhir,
                tahun_mulai,
                tahun_selesai,
                nilai,
                organisasi,
                user: {
                    connect: { id: userId }
                }
            }
        });
        res.json(createdEducationHistory);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create education history' });
    }
};

exports.getUserEducationHistories = async (req, res) => {
    try {
        const educationHistories = await prisma.user_education_history.findMany({
            include: { user: true }
        });
        res.json(educationHistories);
    } catch (error) {
        console.error("Error fetching education histories:", error);
        res.status(500).json({ error: 'Failed to fetch education histories' });
    }
};

exports.getUserEducationHistoryById = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const educationHistory = await prisma.user_education_history.findUnique({
            where: { id },
            include: { user: true }
        });

        if (!educationHistory) {
            return res.status(404).json({ error: 'Education history not found' });
        }

        return res.json(educationHistory);
    } catch (error) {
        console.error("Error fetching education history by ID:", error);
        return res.status(500).json({ error: 'Failed to fetch education history by ID' });
    }
};

exports.updateUserEducationHistory = async (req, res) => {
    const id = parseInt(req.params.id);
    const { pendidikan_terakhir, tahun_mulai, tahun_selesai, nilai, organisasi, userId } = req.body;
    try {
        const updatedEducationHistory = await prisma.user_education_history.update({
            where: { id },
            data: {
                pendidikan_terakhir,
                tahun_mulai,
                tahun_selesai,
                nilai,
                organisasi,
                user: {
                    connect: { id: userId }
                }
            }
        });
        res.json(updatedEducationHistory);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update education history' });
    }
};

exports.deleteUserEducationHistory = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        await prisma.user_education_history.delete({
            where: { id }
        });
        res.json({ message: 'Education history deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete education history' });
    }
};
