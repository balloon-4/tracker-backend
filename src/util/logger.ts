import pino from "pino";

const transport = pino.transport({
  targets: [
    {
      target: "pino-pretty",
      level:
        // biome-ignore lint/complexity/useLiteralKeys: <explanation>
        process.env["DEBUG"] === "true"
          ? "debug"
          // biome-ignore lint/complexity/useLiteralKeys: <explanation>
          : process.env["LOG_LEVEL"] || "info",
      options: {
        // biome-ignore lint/complexity/useLiteralKeys: <explanation>
        include: process.env["DEBUG"] === "true" ? undefined : "time,level,msg",
      },
    },
  ],
});

const logger = pino(transport);

export default logger;
