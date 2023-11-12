const request = require('supertest');
const app = require('../app'); // Ganti dengan jalur menuju aplikasi Express kamu

describe('User Education History API', () => {
  // Test untuk membuat riwayat pendidikan pengguna baru
  it('should create a new user education history', async () => {
    const newEducation = {
      pendidikan_terakhir: 'S2',
      tahun_mulai: "2020-09-01T00:00:00.000Z",
      tahun_selesai: "2023-09-01T00:00:00.000Z",
      nilai: 3.09,
      organisasi: 'Universitas ABC',
      userId: 1 // Ganti dengan ID pengguna yang valid
    };

    const response = await request(app)
      .post('/users/user-education-histories')
      .send(newEducation);

    expect(response.statusCode).toBe(200);
    expect(response.body.pendidikan_terakhir).toBe(newEducation.pendidikan_terakhir);
    // Lakukan pengujian lainnya sesuai kebutuhan
  });

  // Test untuk mendapatkan semua riwayat pendidikan pengguna
  it('should get all user education histories', async () => {
    const response = await request(app).get('/users/user-education-histories');

    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    // Lakukan pengujian lainnya sesuai kebutuhan
  });

  // Test untuk mendapatkan riwayat pendidikan pengguna berdasarkan ID
  it('should get a user education history by ID', async () => {
    const id = 1; // Ganti dengan ID riwayat pendidikan yang valid

    const response = await request(app).get(`/users/user-education-histories/${id}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('id', id);
    // Lakukan pengujian lainnya sesuai kebutuhan
  });

  // Test untuk mengupdate riwayat pendidikan pengguna
  it('should update a user education history by ID', async () => {
    const id = 1; // Ganti dengan ID riwayat pendidikan yang valid
    const updatedEducation = {
      pendidikan_terakhir: 'S3',
      tahun_mulai: "2020-09-01T00:00:00.000Z",
      tahun_selesai: "2023-09-01T00:00:00.000Z",
      nilai: 2.98,
      organisasi: 'Universitas XYZ',
      userId: 2 // Ganti dengan ID pengguna yang valid
    };

    const response = await request(app)
      .put(`/users/user-education-histories/${id}`)
      .send(updatedEducation);

    expect(response.statusCode).toBe(200);
    expect(response.body.id).toBe(id);
    expect(response.body.pendidikan_terakhir).toBe(updatedEducation.pendidikan_terakhir);
    // Lakukan pengujian lainnya sesuai kebutuhan
  });

  // Test untuk menghapus riwayat pendidikan pengguna berdasarkan ID
  it('should delete a user education history by ID', async () => {
    const id = 1; // Ganti dengan ID riwayat pendidikan yang valid

    const response = await request(app).delete(`/users/user-education-histories/${id}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Education history deleted successfully');
    // Lakukan pengujian lainnya sesuai kebutuhan
  });
});
