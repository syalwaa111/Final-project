-- CreateTable
CREATE TABLE "User" (
    "id_user" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "id_user_education" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id_user")
);

-- CreateTable
CREATE TABLE "Admin" (
    "id_admin" SERIAL NOT NULL,
    "username" VARCHAR,
    "password" VARCHAR,
    "email" VARCHAR,
    "id_application" INT,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id_admin")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");

-- AddForeignKey
ALTER TABLE "Admin" ADD CONSTRAINT "Admin_id_fkey" FOREIGN KEY ("id_admin") REFERENCES "Admin"("id_admin") ON DELETE RESTRICT ON UPDATE CASCADE;
