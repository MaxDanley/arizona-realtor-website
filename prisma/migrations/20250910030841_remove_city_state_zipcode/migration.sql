/*
  Warnings:

  - You are about to drop the column `city` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `zipCode` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."users" DROP COLUMN "city",
DROP COLUMN "state",
DROP COLUMN "zipCode";
