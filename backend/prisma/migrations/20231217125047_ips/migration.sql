/*
  Warnings:

  - Added the required column `userId` to the `Ip` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Ip" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "address" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Ip_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Ip" ("address", "id") SELECT "address", "id" FROM "Ip";
DROP TABLE "Ip";
ALTER TABLE "new_Ip" RENAME TO "Ip";
CREATE UNIQUE INDEX "Ip_address_key" ON "Ip"("address");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
