import type { ServiceReturnTypeV2 } from "../@types/controllerUtils.js";
import { prisma } from "../repositories/prisma.js";
import type { components } from "../@types/openapi.js";

const createTelemetry = async (
  deviceId: string,
  input: components["schemas"]["PostTelemetry"][],
): Promise<ServiceReturnTypeV2<"createTelemetry">> => {
  try {
    const data = input.map(
      ({ date, location, battery, sensors, cellular }) => ({
        deviceId,
        date: new Date(date ?? Date.now()),
        // Location
        latitude: location.latitude ?? null,
        longitude: location.longitude ?? null,
        speed: location.speed ?? null,
        accuracy: location.accuracy ?? null,
        altitude: location.altitude ?? null,
        provider: location.provider ?? null,
        locationTimestamp: location.timestamp
          ? new Date(location.timestamp)
          : null,
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
        cellId: cellular.cellId ?? null,
        mcc: cellular.mcc ?? null,
        mnc: cellular.mnc ?? null,
      }),
    );

    const result = await prisma.telemetry.createMany({ data });

    return {
      success: true,
      data: { count: result.count },
    };
  } catch (error) {
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
