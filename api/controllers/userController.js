const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createUser = async (req, res) => {
    try {
        const userData = req.body;

        if (userData.tgl_lahir) {
            userData.tgl_lahir = new Date(userData.tgl_lahir).toISOString();
        }

        if (userData.educationHistory) {
            if (userData.educationHistory.tahun_mulai) {
                userData.educationHistory.tahun_mulai = new Date(userData.educationHistory.tahun_mulai).toISOString();
            }
            if (userData.educationHistory.tahun_selesai) {
                userData.educationHistory.tahun_selesai = new Date(userData.educationHistory.tahun_selesai).toISOString();
            }
        }

        if (userData.jobHistory) {
            if (userData.jobHistory.tahun_mulai) {
                userData.jobHistory.tahun_mulai = new Date(userData.jobHistory.tahun_mulai).toISOString();
            }
            if (userData.jobHistory.tahun_selesai) {
                userData.jobHistory.tahun_selesai = new Date(userData.jobHistory.tahun_selesai).toISOString();
            }
        }

        const educationData = userData.educationHistory;
        const jobData = userData.jobHistory;
        delete userData.educationHistory;
        delete userData.jobHistory;

        const user = await prisma.user.create({
            data: {
                ...userData,
                educationHistory: educationData ? { create: educationData } : undefined,
                jobHistory: jobData ? { create: jobData } : undefined,
            },
        });

        res.json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getAllUsers = async (req, res) => {
    const users = await prisma.user.findMany({
        include: {
            educationHistory: true,
            jobHistory: true,
        },
    });
    res.json(users);
};

exports.getUserById = async (req, res) => {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
        where: { id_user: parseInt(id) },
        include: {
            educationHistory: true,
            jobHistory: true,
        },
    });
    res.json(user);
};

exports.updateUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await prisma.user.update({
            where: { id_user: parseInt(id) },
            data: req.body,
        });
        res.json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.user.delete({
            where: { id_user: parseInt(id) },
        });
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};