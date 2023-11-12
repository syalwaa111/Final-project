/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_user` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `id_user_education` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `id_user_job` on the `User` table. All the data in the column will be lost.
  - The primary key for the `User_education_history` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_user_education` on the `User_education_history` table. All the data in the column will be lost.
  - The primary key for the `User_job_history` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_user_job` on the `User_job_history` table. All the data in the column will be lost.
  - You are about to drop the `Admin` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Application` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Company` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Job` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Job_category` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `User_education_history` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `User_job_history` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_id_user_education_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_id_user_job_fkey";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "id_user",
DROP COLUMN "id_user_education",
DROP COLUMN "id_user_job",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "User_education_history" DROP CONSTRAINT "User_education_history_pkey",
DROP COLUMN "id_user_education",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL,
ADD CONSTRAINT "User_education_history_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "User_job_history" DROP CONSTRAINT "User_job_history_pkey",
DROP COLUMN "id_user_job",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL,
ADD CONSTRAINT "User_job_history_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "Admin";

-- DropTable
DROP TABLE "Application";

-- DropTable
DROP TABLE "Company";

-- DropTable
DROP TABLE "Job";

-- DropTable
DROP TABLE "Job_category";

-- AddForeignKey
ALTER TABLE "User_education_history" ADD CONSTRAINT "User_education_history_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_job_history" ADD CONSTRAINT "User_job_history_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
