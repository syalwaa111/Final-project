/*
  Warnings:

  - Added the required column `id_user_job` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "id_user_job" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "User_job_history" (
    "id_user_job" SERIAL NOT NULL,
    "pekerjaan_terdahulu" TEXT NOT NULL,
    "perusahaan_terdahulu" TEXT NOT NULL,
    "tahun_mulai" TIMESTAMP(3) NOT NULL,
    "tahun_selesai" TIMESTAMP(3) NOT NULL,
    "pengalaman_kerja" TEXT NOT NULL,
    "keahlian" TEXT NOT NULL,

    CONSTRAINT "User_job_history_pkey" PRIMARY KEY ("id_user_job")
);

-- CreateTable
CREATE TABLE "Job" (
    "id_job" SERIAL NOT NULL,

    CONSTRAINT "Job_pkey" PRIMARY KEY ("id_job")
);

-- CreateTable
CREATE TABLE "Job_category" (
    "id_job_category" SERIAL NOT NULL,

    CONSTRAINT "Job_category_pkey" PRIMARY KEY ("id_job_category")
);

-- CreateTable
CREATE TABLE "Company" (
    "id_company" SERIAL NOT NULL,
    "nama_perusahaan" TEXT NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id_company")
);

-- CreateTable
CREATE TABLE "Admin" (
    "id_admin" SERIAL NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id_admin")
);

-- CreateTable
CREATE TABLE "Application" (
    "id_application" SERIAL NOT NULL,

    CONSTRAINT "Application_pkey" PRIMARY KEY ("id_application")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_id_user_job_fkey" FOREIGN KEY ("id_user_job") REFERENCES "User_job_history"("id_user_job") ON DELETE RESTRICT ON UPDATE CASCADE;
