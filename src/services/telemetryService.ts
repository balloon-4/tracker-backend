import type { ServiceReturnTypeV2 } from "../@types/controllerUtils.js";

const createTelemetry = async (
  deviceId: string,
  input: any
): Promise<ServiceReturnTypeV2<"createTelemetry">> => {
    return {
        success: false, 
        error: {
            status:500,
            title: "Internal Server Error",
        }
    }
};

export default {
  createTelemetry,
};