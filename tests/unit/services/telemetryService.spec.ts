import { expect } from "chai";
import sinon from "sinon";
import telemetryService from "../../../src/services/telemetryService.js";
import { prisma } from "../../../src/repositories/prisma.js";
import type { components } from "../../../src/@types/openapi.js"

const deviceId = "b876ec32-e396-476b-a115-8438d83c67d4";
const telemetryInput: components["schemas"]["PostTelemetry"] = {
  date: new Date().toISOString(),
  location: {
    latitude: 1.23,
    longitude: 4.56,
    speed: 7.89,
    accuracy: 0.1,
    altitude: 100,
    provider: "gps",
    timestamp: new Date().toISOString(),
    timeToFix: 2.5,
    bearing: 180,
  },
  battery: {
    voltage: 3.7,
    current: 0.5,
    temperature: 25,
    level: 90,
    charging: true,
  },
  sensors: {
    barometer: 1013,
    light: 200,
    proximity: 1,
  },
  cellular: {
    networkType: "LTE",
    signalStrength: -70,
    cellId: "cell-123",
    mcc: "310",
    mnc: "260",
  },
};

describe("telemetryService", () => {
  let createStub: sinon.SinonStub;

  beforeEach(() => {
    createStub = sinon.stub(prisma.telemetry, "create");
  });

  afterEach(() => {
    sinon.restore();
  });

  it("should create telemetry with flat schema", async () => {
    createStub.resolves({ id: "f428b7ff-7ca2-4fa5-b8b7-fd62ac6140f8", ...telemetryInput, deviceId });
    const result = await telemetryService.createTelemetry(deviceId, telemetryInput);
    expect(createStub.calledOnce).to.be.true;
    const args = createStub.firstCall.args[0].data;
    expect(args.deviceId).to.equal(deviceId);
    expect(args.latitude).to.equal(telemetryInput.location.latitude);
    expect(args.voltage).to.equal(telemetryInput.battery.voltage);
    expect(result).to.have.property("success", true);
    expect(result).to.have.property("data");
    // @ts-expect-error success is checked above
    expect(result.data.id).to.equal("telemetry-1");
  });
});
