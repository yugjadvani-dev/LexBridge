/**
 * Client Authentication Route module
 * Handles all Client authentication-related routes including registration, login operation
 *
 * Routes:
 * - POST /client-auth/registration: Register new client with avatar upload
 * - POST /client-auth/login: Authenticate existing client
 * - POST /client-auth/logout: End client session (requires authentication)
 */

import express from "express";
import { clientRegistration } from "../controller/client-auth.controller";

const router = express.Router();

/**
 * Public Routes
 * These routes do not require authentication
 */

router.post("/register", clientRegistration);

/**
 * Protected Routes
 * These routes require valid JWT authentication
 */

export default router;