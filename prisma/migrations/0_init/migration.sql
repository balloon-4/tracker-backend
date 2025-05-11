-- CreateTable
CREATE TABLE "log" (
    "index" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "date" TIMESTAMPTZ(6) NOT NULL,
    "level" TEXT NOT NULL,
    "session" TEXT NOT NULL,

    CONSTRAINT "log_pkey" PRIMARY KEY ("index")
);

-- CreateTable
CREATE TABLE "telemetry" (
    "accuracy" DOUBLE PRECISION,
    "altitude" DOUBLE PRECISION,
    "batteryPercent" DOUBLE PRECISION,
    "cellStrength" DOUBLE PRECISION,
    "date" TIMESTAMPTZ(6) NOT NULL,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "provider" TEXT,
    "session" TEXT NOT NULL,
    "speed" DOUBLE PRECISION,
    "temperature" DOUBLE PRECISION,
    "pressure" DOUBLE PRECISION,
    "timeToFix" DOUBLE PRECISION,
    "cellPower" DOUBLE PRECISION,
    "cellTower" TEXT,

    CONSTRAINT "telemetry_pkey" PRIMARY KEY ("date","session")
);

