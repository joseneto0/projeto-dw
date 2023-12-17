/*
  Warnings:

  - You are about to drop the column `userId` on the `Ip` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Ip" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "address" TEXT NOT NULL
);
INSERT INTO "new_Ip" ("address", "id") SELECT "address", "id" FROM "Ip";
DROP TABLE "Ip";
ALTER TABLE "new_Ip" RENAME TO "Ip";
CREATE UNIQUE INDEX "Ip_address_key" ON "Ip"("address");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
