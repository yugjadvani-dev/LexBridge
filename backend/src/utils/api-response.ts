/**
 * API Response Handler Module
 * Provides a standardized way to format API responses across the application.
 */

import { Response } from "express";

/**
 * Class to handle API responses with consistent structure
 */
class ApiResponse {
  statusCode: number; // HTTP status code
  data: object; // Response payload
  message: string; // Response message
  success: boolean; // Response status flag

  /**
   * Creates an instance of ApiResponse
   * @param statusCode - HTTP status code (e.g., 200, 201, 400, 404)
   * @param data - Response data object
   * @param message - Response message (defaults to 'Success')
   */
  constructor(statusCode: number, data: object, message = "Success") {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    // Automatically set success based on status code (4xx and 5xx are failures)
    this.success = statusCode < 400;
  }
}

/**
 * Sends a standardized API response
 * @param res - Express Response object
 * @param statusCode - HTTP status code
 * @param data - Response data
 * @param message - Response message
 */
export const sendResponse = (res: Response, statusCode: number, data: any, message: string): void => {
  res.status(statusCode).json(new ApiResponse(statusCode, data, message));
};

/**
 * Handles errors
 * @param res - Express Response object
 * @param error - Error object or message
 * @param defaultMessage - Default message to use if error doesn't have a message
 */
export const sendError = (res: Response, error: any, defaultMessage: string = "Something went wrong"): void => {
  const statusCode = error.statusCode || 500;
  const message = error.message || defaultMessage;
  sendResponse(res, statusCode, {}, message);
};
