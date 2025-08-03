import { TelemetryRequest, Telemetry, TrackerClient, Location, Battery, Sensors, Cellular } from "./proto/api/api.ts";
import * as grpc from "@grpc/grpc-js";

const tracker = new TrackerClient(
  "localhost:50051",
  grpc.credentials.createInsecure(),
);

(async () => {
  const req = new TelemetryRequest({
    deviceId: "user123",
    telemetries: [
      new Telemetry({
        date: new Date().toISOString(),
        location: new Location(),
        battery: new Battery(),
        sensors: new Sensors(),
        cellular: new Cellular(),
      }),
    ],
  });
  const output = await tracker.addTelemetry(req);
  console.log("TelemetryResponse:", output.toObject());
})();
