-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "image" TEXT,
ADD COLUMN     "menu" TEXT,
ADD COLUMN     "time" INTEGER,
ADD COLUMN     "timeUnit" TEXT;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "filter" DROP DEFAULT;
