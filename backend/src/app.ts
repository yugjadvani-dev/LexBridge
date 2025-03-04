/**
 * Express Application Configuration
 * This module sets up the Express application with necessary middleware and routes.
 * It includes CORS configuration, body parsing, and static file serving.
 */

import express from "express";
import cors from "cors";
import routes from "./routes";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger-output.json";
import { errorHandler } from "./middleware/error-handler";
import config from "./config";

const app = express();

/**
 * Middleware Configuration
 * - CORS: Enables Cross-Origin Resource Sharing with specified origin
 * - Body Parser: Handles JSON and URL-encoded bodies with 16kb limit
 * - Static Files: Serves static files from 'public' directory
 */
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

// Add error handling as the last middleware, just prior to our app.listen call.
// This ensures that all errors are always handled.
app.use(errorHandler);

// Mount API routes under /api/v1 prefix
app.use(`/${config.prefix}/v1`, routes);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default app;
