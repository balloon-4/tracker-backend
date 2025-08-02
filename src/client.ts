import { PointRequest, TrackerClient } from "./proto/api/api.ts";
import * as grpc from "@grpc/grpc-js";

const tracker = new TrackerClient(
  "localhost:50051",
  grpc.credentials.createInsecure(),
);

(async () => {
  const output = await tracker.addPoint(
    new PointRequest({ user_id: "user123" }),
  );
  console.log("Point added:", output.toObject());
})();
