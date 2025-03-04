/**
 * Client Authentication Management Controllers
 * This module handles all client-related operations including profile management,
 * client listing, and profile updates/deletions.
 */

import { Request, Response } from "express";
import { sendError, sendResponse } from "../utils/api-response";
import { validateRequiredFields } from "../utils/validate-required-fields";
import { comparePassword, hashPassword } from "../utils/auth-utils";
import generateAuthToken from "../utils/generate-auth-token";
import pool from "../db";

/**
 * Register a new client
 * @route POST `/api/client-auth/register`
 * @param {Request} req - Express request object containing client registration data
 * @param {Response} res - Express response object
 * @throws {Error} If registration fails
 */
export const clientRegistration = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, email, password } = req.body;

    const validation = validateRequiredFields({ username, email, password });
    if(!validation.isValid) {
      sendResponse(res, 400, {}, "Required Fields are missing");
      return;
    }

    const clientExists = await pool.query("SELECT * FROM clients WHERE email = $1", [email]);
    if (clientExists?.rows?.length > 0) {
      sendResponse(res, 409, {}, "Client already exists");
      return;
    }

    const hashedPassword = await hashPassword(password)

    const newClient = await pool.query(
      "INSERT INTO clients (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email",
      [username, email, hashedPassword],
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
    const { email, password } = req.body;

    const validation = validateRequiredFields({ email, password });
    if (!validation.isValid) {
      sendResponse(res, 400, {}, "Required Fields are missing");
      return;
    }

    const clientExists = await pool.query("SELECT * FROM clients WHERE email = $1", [email]);
    if (!clientExists?.rows?.length) {
      sendResponse(res, 404, {}, "Client not found");
      return;
    }

    if (!clientExists?.rows[0]?.is_verified) {
      sendResponse(res, 401, {}, "Client is not verified");
      return;
    }

    const compare = await comparePassword(password, clientExists?.rows[0]?.password);
    if (!compare) {
      sendResponse(res, 404, {}, "Invalid Credentials");
      return;
    }

    const safeClient = {
      id: clientExists?.rows[0]?.id,
      username: clientExists?.rows[0]?.username,
      avatar: clientExists?.rows[0]?.avatar,
      first_name: clientExists?.rows[0]?.first_name,
      last_name: clientExists?.rows[0]?.last_name,
      email: clientExists?.rows[0]?.email,
      phone_number: clientExists?.rows[0]?.phone_number,
      is_verified: clientExists?.rows[0]?.is_verified,
    };

    const token = generateAuthToken(safeClient?.id, safeClient?.username, "client");

    const client = {
      safeClient,
      token,
    };

    sendResponse(res, 200, client, "Client Login Successfully");
    return;
  } catch (error) {
    sendError(res, error, "Something went wrong while client login");
    return;
  }
}