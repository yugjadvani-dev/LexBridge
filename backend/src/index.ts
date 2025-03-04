/**
 * Server Entry Point
 * This is the main entry point for the LexBridge Uber Clone backend application.
 * It initializes and starts the Express server on the specified port.
 */

import app from "./app";
import config from "./config";

app.listen(config.port, () => {
  console.log(`🚀 Server is running on: http://localhost:${config.port}`);
  console.log(`📚 API Documentation: http://localhost:${config.port}/api-docs`);
});
