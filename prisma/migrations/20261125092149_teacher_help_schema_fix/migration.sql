/*
  Warnings:

  - You are about to drop the column `logoUrl` on the `brands` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `brands` table. All the data in the column will be lost.
  - You are about to drop the column `height` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `users` table. All the data in the column will be lost.
  - Added the required column `logo` to the `brands` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `brands` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zipcode` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_brands" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "logo" TEXT NOT NULL
);
INSERT INTO "new_brands" ("id") SELECT "id" FROM "brands";
DROP TABLE "brands";
ALTER TABLE "new_brands" RENAME TO "brands";
CREATE TABLE "new_users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'USER',
    "refreshToken" TEXT,
    "zipcode" INTEGER NOT NULL,
    "birthdate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_users" ("createdAt", "email", "firstname", "id", "isActive", "lastname", "password") SELECT "createdAt", "email", "firstname", "id", "isActive", "lastname", "password" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
