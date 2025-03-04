/**
 * Database Configuration Module
 *
 * This module sets up and manages a PostgresSQL connection pool using the `pg` library.
 * It leverages environment variables for secure configuration and includes an asynchronous
 * verification function to confirm connectivity at startup.
 */

import { Pool } from "pg";
import config from "../config";

/**
 * PostgresSQL connection pool configuration
 * Uses environment variables for secure configuration
 * Enables connection pooling for better performance and resource management
 */
const pool = new Pool({
  user: config.db.user,
  password: config.db.password,
  database: config.db.name,
  host: config.db.host,
  port: Number(config.db.port),
});

// Verify database connection on startup
async function verifyConnection(): Promise<void> {
  try {
    const client = await pool.connect();
    console.log("✅ Connected to PostgreSQL database");
    client.release();
  } catch (error) {
    console.log("❌ Error connecting to the database:", error);
  }
}

verifyConnection();

export default pool;
