
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

  const bob = await prisma.user.upsert({
    where: { email: 'bob@prisma.io' },
    update: {},
    create: {
      email: 'bob@prisma.io',
      name: 'Bob',
      user_job_histories: {
        create: {
          pekerjaan_terdahulu: 'Web Developer', 
          perusahaan_terdahulu: 'Rakamin', 
          tahun_mulai: new Date('2019-01-01'),
          tahun_selesai: new Date('2022-01-01'),
          pengalaman_kerja: 'Back End Developer',
          keahlian: 'Node JS, Express JS, React JS, Next JS',
        },
      },
    },
  });
  console.log({ alice, bob })
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