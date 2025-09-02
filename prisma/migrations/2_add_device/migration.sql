/*
  Streamlined migration to minimize heavy operations:
  - Derive deviceId deterministically from session using md5(session)
  - Avoid temp tables and joins
  - Add FK as NOT VALID (validate later)
*/

-- Create device table
CREATE TABLE "device" (
    "id"   TEXT   NOT NULL,
    "name" TEXT   NOT NULL,
    CONSTRAINT "device_pkey" PRIMARY KEY ("id")
);

-- Add deviceId column as NULLABLE first (no default)
ALTER TABLE "telemetry" ADD COLUMN "deviceId" TEXT;

-- Backfill deviceId deterministically: use md5(session)
UPDATE "telemetry" SET "deviceId" = md5("session") WHERE "deviceId" IS NULL;

-- Insert devices using the same deterministic id, keep name = session
INSERT INTO "device" ("id", "name")
SELECT DISTINCT md5("session") AS id, "session" AS name
FROM "telemetry"
WHERE "session" IS NOT NULL
ON CONFLICT DO NOTHING;

-- Make deviceId NOT NULL
ALTER TABLE "telemetry" ALTER COLUMN "deviceId" SET NOT NULL;

-- Replace PK to include deviceId
ALTER TABLE "telemetry" DROP CONSTRAINT "telemetry_pkey";
ALTER TABLE "telemetry" ADD CONSTRAINT "telemetry_pkey" PRIMARY KEY ("date", "session", "deviceId");

-- Add FK constraint to device(id) without immediate validation to avoid full scan now
ALTER TABLE "telemetry" ADD CONSTRAINT "telemetry_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "device"("id") ON DELETE CASCADE ON UPDATE CASCADE;
