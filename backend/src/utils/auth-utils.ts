/**
 * Authentication and User Management Utilities
 * This module provides utility functions for handling common authentication
 * and user management operations like validation, error handling, and responses.
 */

import bcrypt from "bcrypt";

export const hashPassword = async (myPlaintextPassword: string) => {
  const saltRounds = 10;
  return await bcrypt.hash(myPlaintextPassword, saltRounds)
}

export const comparePassword = async (myPlaintextPassword: string, hashedPassword: string) => {
  return await bcrypt.compare(myPlaintextPassword, hashedPassword)
}