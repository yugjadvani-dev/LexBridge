/**
 * Client Authentication Management Controllers
 * This module handles all client-related operations including profile management,
 * client listing, and profile updates/deletions.
 */

import { Request, Response } from "express";
import { sendError, sendResponse } from "../utils/api-response";
import { validateRequiredFields } from "../utils/validate-required-fields";
import pool from "../db/db";
import { hashPassword } from "../utils/auth-utils";

/**
 * Register a new client
 * @route POST `/api/client-auth/register`
 * @param {Request} req - Express request object containing client registration data
 * @param {Response} res - Express response object
 * @throws {Error} If registration fails
 */
export const clientRegistration = async (req: Request, res: Response): Promise<void> => {
  try {
    const {first_name, last_name, email, password} = req.body;

    const validation = validateRequiredFields({ first_name, last_name, email, password });
    if(!validation.isValid) {
      sendResponse(res, 400, {}, "Required Fields are missing");
      return;
    }

    const clietExists = await pool.query('SELECT * FROM clients WHERE email = $1', [email]);
    if(clietExists?.rows?.length > 0) {
      sendResponse(res, 409, {}, "Client already exists");
      return;
    }

    const hashedPassword = await hashPassword(password)

    const newClient = await pool.query(
      'INSERT INTO clients (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING id, first_name, last_name, email',
      [first_name, last_name, email, hashedPassword],
    )

    sendResponse(res, 201, newClient.rows[0], "Client Registration Successfully");
    return;
  } catch (error) {
    sendError(res, error, "Something went wrong while client registration");
    return;
  }
};

/**
 * Login a exist client
 * @route POST `/api/client-auth/login`
 * @param {Request} req - Express request object containing client login data
 * @param {Response} res - Express response object
 * @throws {Error} If login fails
 */
export const clientLogin = async (req: Request, res: Response): Promise<void> => {
  try {

  } catch (error) {
    sendError(res, error, "Something went wrong while client login");
    return;
  }
}