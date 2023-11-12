const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

app.post(async (req, res) => {
    const { username, password, email} = req.body;
    const newAdmin = await prisma.admin.create ({
        data: {
            username,
            password,
            email,
        },
    });

    res.json(newAdmin);
});

app.get(async (req, res) => {
    const allAdmin = await prisma.admin.findMany();
    res.json(allAdmin)
});

app.getAdminById(async (req, res) => {
    const {id} = req.params;
    const admin = await prisma.admin.findUnique({
        where: { id: parseInt(id)},
    });
    if (!admin) {
        res.status(404).json({ message: 'Admin Tidak Ditemukan'});
    }
    res.json(admin);
});

app.updateAdminById(async (req, res) => {
    const {id} = req.params;
    const {username, email} = req.body;
    const updateAdmin = await prisma.admin.update({
        where: { id: parseInt(id)},
        data: {
            username,
            password,
            email,
        },
    });

    res.json(updateAdmin);
});

app.delete(async (req, res) => {
    const {id} = req.params;
    const deleteAdmin = await prisma.admin.delete({
        where: { id: parseInt(id)},
    });
    res.json(deleteAdmin);
});

