/*
  Warnings:

  - You are about to drop the column `dat_id` on the `day_habits` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[day_id,habit_id]` on the table `day_habits` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `day_id` to the `day_habits` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "day_habits_dat_id_habit_id_key";

-- AlterTable
ALTER TABLE "day_habits" DROP COLUMN "dat_id",
ADD COLUMN     "day_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "day_habits_day_id_habit_id_key" ON "day_habits"("day_id", "habit_id");

-- AddForeignKey
ALTER TABLE "habit_week_days" ADD CONSTRAINT "habit_week_days_habit_id_fkey" FOREIGN KEY ("habit_id") REFERENCES "habits"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "day_habits" ADD CONSTRAINT "day_habits_day_id_fkey" FOREIGN KEY ("day_id") REFERENCES "days"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "day_habits" ADD CONSTRAINT "day_habits_habit_id_fkey" FOREIGN KEY ("habit_id") REFERENCES "habits"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
