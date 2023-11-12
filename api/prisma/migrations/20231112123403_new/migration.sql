/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `User` table. All the data in the column will be lost.
  - You are about to alter the column `email` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to drop the `User_education_history` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User_job_history` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[id_user_education]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id_job_history]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `no_telp` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `jenis_kelamin` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "User_education_history" DROP CONSTRAINT "User_education_history_userId_fkey";

-- DropForeignKey
ALTER TABLE "User_job_history" DROP CONSTRAINT "User_job_history_userId_fkey";

-- DropIndex
DROP INDEX "User_email_key";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "id",
ADD COLUMN     "id_job_history" INTEGER,
ADD COLUMN     "id_user" SERIAL NOT NULL,
ADD COLUMN     "id_user_education" INTEGER,
ALTER COLUMN "email" SET DATA TYPE VARCHAR(50),
DROP COLUMN "no_telp",
ADD COLUMN     "no_telp" INTEGER NOT NULL,
DROP COLUMN "jenis_kelamin",
ADD COLUMN     "jenis_kelamin" "JenisKelamin" NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id_user");

-- DropTable
DROP TABLE "User_education_history";

-- DropTable
DROP TABLE "User_job_history";

-- CreateTable
CREATE TABLE "UserEducationHistory" (
    "id" SERIAL NOT NULL,
    "pendidikan_terakhir" VARCHAR(50) NOT NULL,
    "tahun_mulai" DATE NOT NULL,
    "tahun_selesai" DATE NOT NULL,
    "nilai" DOUBLE PRECISION NOT NULL,
    "organisasi" VARCHAR(50) NOT NULL,

    CONSTRAINT "UserEducationHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserJobHistory" (
    "id" SERIAL NOT NULL,
    "pekerjaan_terdahulu" VARCHAR(50) NOT NULL,
    "perusahaan_terdahulu" VARCHAR(50) NOT NULL,
    "tahun_mulai" DATE NOT NULL,
    "tahun_selesai" DATE NOT NULL,
    "pengalaman_kerja" VARCHAR(255) NOT NULL,
    "keahlian" VARCHAR(50) NOT NULL,

    CONSTRAINT "UserJobHistory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_user_education_key" ON "User"("id_user_education");

-- CreateIndex
CREATE UNIQUE INDEX "User_id_job_history_key" ON "User"("id_job_history");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_id_user_education_fkey" FOREIGN KEY ("id_user_education") REFERENCES "UserEducationHistory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_id_job_history_fkey" FOREIGN KEY ("id_job_history") REFERENCES "UserJobHistory"("id") ON DELETE SET NULL ON UPDATE CASCADE;
