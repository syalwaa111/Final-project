-- CreateTable
CREATE TABLE "User" (
    "id_user" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "id_user_education" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id_user")
);

-- CreateTable
CREATE TABLE "User_education_history" (
    "id_user_education" SERIAL NOT NULL,
    "pendidikan_terakhir" TEXT NOT NULL,
    "tahun_mulai" TIMESTAMP(3) NOT NULL,
    "tahun_selesai" TIMESTAMP(3) NOT NULL,
    "nilai" DOUBLE PRECISION NOT NULL,
    "organisasi" TEXT NOT NULL,

    CONSTRAINT "User_education_history_pkey" PRIMARY KEY ("id_user_education")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_id_user_education_fkey" FOREIGN KEY ("id_user_education") REFERENCES "User_education_history"("id_user_education") ON DELETE RESTRICT ON UPDATE CASCADE;
