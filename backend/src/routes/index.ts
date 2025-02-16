/**
 * Main Router Module
 * Central hub for all application routes.
 * Organizes and mounts different route modules to their respective base paths.
 */

import express from 'express';

// Initialize the main router
const router = express.Router();

// Mount route modules
// router.use('/user', userRoutes); // User management routes (profile, settings, etc.)

export default router;
