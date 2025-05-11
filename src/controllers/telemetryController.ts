import type { Response } from "express";
import {
  type OperationsRequest,
  errorWrapperV3,
} from "../@types/controllerUtils.js";
import telemetryService from "../services/telemetryService.js";

const createTelemetry = async (
  req: OperationsRequest<"createTelemetry">,
  res: Response,
) => {
  const result = await errorWrapperV3(
    req,
    res,
    async () =>
      await telemetryService.createTelemetry(req.params.deviceId, req.body),
  );

  result && res.status(200).send("200 OK");
};

export default {
  createTelemetry,
};
