import dotenv from 'dotenv'
import {Pool} from 'pg'

dotenv.config()

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
})

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