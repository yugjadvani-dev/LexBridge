/**
 * Main Router Module
 * Central hub for all application routes.
 * Organizes and mounts different route modules to their respective base paths.
 */

import express from "express";
import clientAuthRoute from "./client-auth.route";

// Initialize the main router
const router = express.Router();

router.use("/client-auth", clientAuthRoute); // Authentication routes (register)

export default router;
