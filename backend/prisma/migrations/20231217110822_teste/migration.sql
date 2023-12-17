/*
  Warnings:

  - A unique constraint covering the columns `[address]` on the table `Ip` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Ip_address_key" ON "Ip"("address");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
