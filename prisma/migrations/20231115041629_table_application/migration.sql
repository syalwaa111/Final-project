/*
  Warnings:

  - You are about to drop the column `tgl_gabung` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `tgl_lahir` on the `User` table. All the data in the column will be lost.
  - Added the required column `tanggal_lahir` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "tgl_gabung",
DROP COLUMN "tgl_lahir",
ADD COLUMN     "tanggal_gabung" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "tanggal_lahir" DATE NOT NULL,
ALTER COLUMN "nama_lengkap" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Admin" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Application" (
    "id" SERIAL NOT NULL,
    "tgl_pengajuan" TIMESTAMP(3) NOT NULL,
    "status" VARCHAR(50) NOT NULL,
    "jobId" INTEGER NOT NULL,
    "adminId" INTEGER NOT NULL,

    CONSTRAINT "Application_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
