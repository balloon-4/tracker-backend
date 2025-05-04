import type { Response } from "express";
import telemetryService from "../services/telemetryService.js";
import { errorWrapperV3, type OperationsRequest } from "../@types/controllerUtils.js";

const createTelemetry = async (req: OperationsRequest<'createTelemetry'>, res: Response) => {
    await errorWrapperV3(
        req,
        res,
        async () => await telemetryService.createTelemetry(req.params.deviceId, req.body),
      );
  
      res.status(200).send("200 OK");
};

export default {
  createTelemetry,
};
