const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createUser = async (req, res) => {
    try {
      const userData = req.body;
  
      if (userData.tgl_lahir) {
        const formattedDateTime = new Date(userData.tgl_lahir).toISOString();
        userData.tgl_lahir = formattedDateTime;
      }      
  
      const user = await prisma.user.create({
        data: userData
      });

      res.json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
exports.getAllUsers = async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
};

exports.getUserById = async (req, res) => {
  const { id } = req.params;
  const user = await prisma.user.findUnique({
    where: { id_user: parseInt(id) },
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