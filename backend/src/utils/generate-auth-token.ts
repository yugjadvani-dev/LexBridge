/**
 * Authentication Token Generator
 * This module provides functionality to generate JWT access tokens for authenticated users.
 */

import jwt from 'jsonwebtoken'
import config from "../config";

/**
 * Generates a JWT access token for a client
 * @param id - The unique identifier of the client
 * @param name - The name to identifier of the client
 * @param role - The roles (client)
 * @returns JWT access token string
 * @throws Error if ACCESS_TOKEN_SECRET is not configured
 */

const generateAuthToken = (id: string, name: string, role: string) => {
  return jwt.sign({id, name, role}, config.jwt.secret!, {
    expiresIn: "1d",
    notBefore: '0', // Cannot use before now, can be configured to be deferred.
    algorithm: 'HS256',
    audience: config.jwt.audience,
    issuer: config.jwt.issuer
  })
}

export default generateAuthToken;