ALTER TABLE "telemetry" RENAME COLUMN "batteryPercent" TO "level";
ALTER TABLE "telemetry" RENAME COLUMN "cellPower" TO "signalPower";
ALTER TABLE "telemetry" RENAME COLUMN "cellStrength" TO "signalStrength";
ALTER TABLE "telemetry" RENAME COLUMN "pressure" TO "barometer";

ALTER TABLE "telemetry"
ADD COLUMN     "bearing" DOUBLE PRECISION,
ADD COLUMN     "charging" BOOLEAN,
ADD COLUMN     "current" DOUBLE PRECISION,
ADD COLUMN     "light" DOUBLE PRECISION,
ADD COLUMN     "networkType" TEXT,
ADD COLUMN     "proximity" DOUBLE PRECISION,
ADD COLUMN     "voltage" DOUBLE PRECISION;
