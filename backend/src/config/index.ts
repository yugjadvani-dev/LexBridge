import * as dotenv from 'dotenv';

dotenv.config();

// Create a configuration object to hold those environment variables.
const config = {
  db: {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    name: process.env.DB_NAME,
  },
  // JWT important variables
  jwt: {
    // The secret is used to sign and validate signatures.
    secret: process.env.JWT_SECRET,
    // The audience and issuer are used for validation purposes.
    audience: process.env.JWT_AUDIENCE,
    issuer: process.env.JWT_ISSUER
  },
  // The basic API port and prefix configuration values are:
  port: process.env.PORT || 8080,
  prefix: process.env.API_PREFIX || 'api',
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET,
  },
  mailer: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  }
};

// Make our confirmation object available to the rest of our code.
export default config;