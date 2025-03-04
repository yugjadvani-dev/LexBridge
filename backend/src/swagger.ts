import swaggerAutogen from "swagger-autogen";
import config from "./config";

const doc = {
  info: {
    version: "v1.0.0",
    title: "LexBridge Document",
    description:
      "LexBridge is a seamless platform that connects clients with verified legal experts, offering secure communication, easy appointment booking, transparent pricing, and comprehensive legal services all in one place.",
  },
  host: `localhost:${config.port}/api/v1`,
  basePath: "/",
  schemes: ["http", "https"],
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["src/routes/index.ts"];

swaggerAutogen()(outputFile, endpointsFiles, doc);
