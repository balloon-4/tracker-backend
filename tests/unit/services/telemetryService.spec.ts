import { expect } from "chai";
import sinon from "sinon";
import type { components } from "../../../src/@types/openapi.js";
import { prisma } from "../../../src/repositories/prisma.js";
import telemetryService from "../../../src/services/telemetryService.js";

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
    signalPower: -90,
    cellTower: "tower123",
  },
};

describe("telemetryService", () => {
  let createManyStub: sinon.SinonStub;

  beforeEach(() => {
    createManyStub = sinon.stub();
  });

  afterEach(() => {
    sinon.restore();
  });

  it("should create telemetry with flat schema", async () => {
    prisma.telemetry.createMany = createManyStub;
    createManyStub.resolves({ count: 1 });
    const result = await telemetryService.createTelemetry(deviceId, [
      telemetryInput,
    ]);
    expect(createManyStub.calledOnce).to.be.true;
    expect(result).to.have.property("success", true);
    // @ts-expect-error success is checked above
    expect(result.data.count).to.equal(1);
  });
});
