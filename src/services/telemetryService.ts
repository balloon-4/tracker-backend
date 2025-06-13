import type { ServiceReturnTypeV2 } from "../@types/controllerUtils.js";
import type { components } from "../@types/openapi.js";
import { prisma } from "../repositories/prisma.js";
import logger from "../util/logger.js";

const createTelemetry = async (
  deviceId: string,
  input: components["schemas"]["PostTelemetry"][],
): Promise<ServiceReturnTypeV2<"createTelemetry">> => {
  try {
    const data = input.map(
      ({ date, location, battery, sensors, cellular }) => ({
        session: deviceId,
        date: new Date(date ?? Date.now()),
        // Location
        latitude: location.latitude ?? null,
        longitude: location.longitude ?? null,
        speed: location.speed ?? null,
        accuracy: location.accuracy ?? null,
        altitude: location.altitude ?? null,
        provider: location.provider ?? null,
        timeToFix: location.timeToFix ?? null,
        bearing: location.bearing ?? null,
        // Battery
        voltage: battery.voltage ?? null,
        current: battery.current ?? null,
        temperature: battery.temperature ?? null,
        level: battery.level ?? null,
        charging: battery.charging ?? null,
        // Sensors
        barometer: sensors.barometer ?? null,
        light: sensors.light ?? null,
        proximity: sensors.proximity ?? null,
        // Cellular
        networkType: cellular.networkType ?? null,
        signalStrength: cellular.signalStrength ?? null,
        signalPower: cellular.signalPower ?? null,
        cellTower: cellular.cellTower ?? null,
      }),
    );

    logger.info(
      `Creating ${data.length} telemetry records for device ${deviceId}`,
    );

    const result = await prisma.telemetry.createMany({
      data,
      skipDuplicates: true,
    });

    return {
      success: true,
      data: { count: result.count },
    };
  } catch (error) {
    logger.error('Error creating telemetry:', error);

    return {
      success: false,
      error: {
        status: 500,
        title: "Internal Server Error",
        detail: (error as Error).message,
      },
    };
  }
};

export default {
  createTelemetry,
};
