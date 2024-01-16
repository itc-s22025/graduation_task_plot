/*
  Warnings:

  - You are about to drop the column `birth` on the `User` table. All the data in the column will be lost.
  - You are about to alter the column `name` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(64)`.
  - Added the required column `profileImg` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `salt` to the `User` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `password` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "birth",
ADD COLUMN     "dateOfBirth" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "profileImg" TEXT NOT NULL,
ADD COLUMN     "salt" BYTEA NOT NULL,
ALTER COLUMN "name" SET DATA TYPE VARCHAR(64),
DROP COLUMN "password",
ADD COLUMN     "password" BYTEA NOT NULL;

-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
