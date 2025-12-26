import { UnimplementedTrackerService } from "../proto/api/api.js";
import { type TelemetryRequest, TelemetryResponse } from "../proto/api/api.js";
import * as grpc from "@grpc/grpc-js";
import telemetryService from "../services/telemetryService.js";
import logger from "../util/logger.js";

export class TrackerService extends UnimplementedTrackerService {
  async addTelemetry(
    call: grpc.ServerUnaryCall<TelemetryRequest, TelemetryResponse>,
    callback: grpc.sendUnaryData<TelemetryResponse>
  ): Promise<void> {
    try {
      const deviceId = call.request.deviceId;
      if (!deviceId) {
        callback({ code: grpc.status.INVALID_ARGUMENT, message: "Missing deviceId in request body" }, null);
        return;
      }
      
      const telemetries = call.request.telemetries.map(t => {
        const obj = t.toObject();
        return {
          date: obj.date?.trim() ? obj.date : null,
          location: {
            latitude: obj.location?.latitude ?? null,
            longitude: obj.location?.longitude ?? null,
            speed: obj.location?.speed ?? null,
            accuracy: obj.location?.accuracy ?? null,
            altitude: obj.location?.altitude ?? null,
            provider: obj.location?.provider ?? null,
            timeToFix: obj.location?.timeToFix ?? null,
            bearing: obj.location?.bearing ?? null,
          },
          battery: {
            voltage: obj.battery?.voltage ?? null,
            current: obj.battery?.current ?? null,
            temperature: obj.battery?.temperature ?? null,
            level: obj.battery?.level ?? null,
            charging: obj.battery?.charging ?? null,
          },
          sensors: {
            barometer: obj.sensors?.barometer ?? null,
            light: obj.sensors?.light ?? null,
            proximity: obj.sensors?.proximity ?? null,
          },
          cellular: {
            networkType: obj.cellular?.networkType ?? null,
            signalStrength: obj.cellular?.signalStrength ?? null,
            signalPower: obj.cellular?.signalPower ?? null,
            cellTower: obj.cellular?.cellTower ?? null,
          }
        };
      });
      logger.info(`Received ${telemetries.length} telemetry records for device ${deviceId}`);
      const result = await telemetryService.createTelemetry(deviceId, telemetries);
      if (result.success) {
        callback(null, new TelemetryResponse());
      } else {
        callback({ code: grpc.status.INTERNAL, message: result.error?.detail || "Unknown error" }, null);
      }
    } catch (error) {
      logger.error(error, "Error in addTelemetry:");
      callback({ code: grpc.status.INTERNAL, message: (error as Error).message }, null);
    }
  }
}
