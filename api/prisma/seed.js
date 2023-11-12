
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  const alice = await prisma.user.upsert({
    where: { email: 'alice@prisma.io' },
    update: {},
    create: {
      email: 'alice@prisma.io',
      name: 'Alice',
      user_education_histories: {
        create: {
          pendidikan_terakhir: 'SMA', // Isi dengan nilai pendidikan terakhir
          tahun_mulai: new Date('2015-01-01'), // Isi dengan tanggal mulai
          tahun_selesai: new Date('2018-01-01'), // Isi dengan tanggal selesai
          nilai: 3.8, // Isi dengan nilai
          organisasi: 'Sekolah Contoh', // Isi dengan nama organisasi
        },
      },
    },
  });  

  console.log({ alice })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })