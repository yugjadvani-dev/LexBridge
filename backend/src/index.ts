/**
 * Server Entry Point
 * This is the main entry point for the LexBridge Uber Clone backend application.
 * It initializes and starts the Express server on the specified port.
 */

import app from './app';

// Start the server on specified port or default to 8080
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on: http://localhost:${PORT}`);
  console.log(`📚 API Documentation: http://localhost:${PORT}/api-docs`);
});
