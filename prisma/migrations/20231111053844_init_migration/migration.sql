/*
  Warnings:

  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - Added the required column `alamat` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jenis_kelamin` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nama_lengkap` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `no_telp` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tgl_lahir` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "JenisKelamin" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "name",
ADD COLUMN     "alamat" VARCHAR(255) NOT NULL,
ADD COLUMN     "jenis_kelamin" "JenisKelamin" NOT NULL,
ADD COLUMN     "nama_lengkap" VARCHAR(50) NOT NULL,
ADD COLUMN     "no_telp" INTEGER NOT NULL,
ADD COLUMN     "password" VARCHAR(50) NOT NULL,
ADD COLUMN     "tgl_gabung" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "tgl_lahir" DATE NOT NULL,
ADD COLUMN     "username" TEXT NOT NULL;
