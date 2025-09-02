/*
  Warnings:

  - The primary key for the `telemetry` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `session` on the `telemetry` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "telemetry" DROP CONSTRAINT "telemetry_pkey",
DROP COLUMN "session",
ADD CONSTRAINT "telemetry_pkey" PRIMARY KEY ("date", "deviceId");
