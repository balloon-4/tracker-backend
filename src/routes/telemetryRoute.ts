import express from "express";
import telemetryController from "../controllers/telemetryController.js";

const router: express.Router = express.Router();

router.post("/:deviceId", telemetryController.createTelemetry);

export default router;
