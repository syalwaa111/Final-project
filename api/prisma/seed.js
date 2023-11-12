const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  const alice = await prisma.user.upsert({
    where: { email: 'alice@prisma.io' },
    update: {},
    create: {
      email: 'alice@prisma.io',
      username: 'Alice',
      password      : '12345678',
      nama_lengkap  : 'Alice',
      alamat        : 'jajaj',
      no_telp       : '99292929',
      jenis_kelamin : 'Female',
      tanggal_lahir : new Date('2001-01-01'),
      tanggal_gabung: new Date('2023-01-01'),
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
      username      : 'Bob',
      password      : '12345678',
      nama_lengkap  : 'Bob',
      alamat        : 'zzzz',
      no_telp       : '09292828',
      jenis_kelamin : 'Male',
      tanggal_lahir : new Date('2000-01-01'),
      tanggal_gabung: new Date('2023-01-01'),
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
  const xyla = await prisma.user.upsert({
    where: { email: 'xyla@prisma.io' },
    update: {},
    create: {
      email         : 'xyla@prisma.io',
      username      : 'xyla',
      password      : '12345678',
      nama_lengkap  : 'xyla syarifatuzzahra',
      alamat        : 'Pacitan',
      no_telp       : '0192883883',
      jenis_kelamin : 'Female',
      tanggal_lahir : new Date('2002-01-01'),
      tanggal_gabung: new Date('2023-01-01'),
    
    
        
        },

  });
  console.log({ alice, bob, xyla })


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