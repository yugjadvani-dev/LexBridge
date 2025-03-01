/**
 * Database Configuration Module
 *
 * This module sets up and manages a PostgreSQL connection pool using the `pg` library.
 * It leverages environment variables for secure configuration and includes an asynchronous
 * verification function to confirm connectivity at startup.
 */

import dotenv from 'dotenv'
import {Pool} from 'pg'

dotenv.config()

/**
 * PostgreSQL connection pool configuration
 * Uses environment variables for secure configuration
 * Enables connection pooling for better performance and resource management
 */
const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
})

// Verify database connection on startup
async function verifyConnection(): Promise<void> {
  try {
    const client = await pool.connect();
    console.log("✅ Connected to PostgreSQL database");
    client.release()
  } catch (error) {
    console.log('❌ Error connecting to the database:', error)
  }
}

verifyConnection();

export default pool;