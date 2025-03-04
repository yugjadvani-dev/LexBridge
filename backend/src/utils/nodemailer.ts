/**
 * Nodemailer Configuration
 * This module configures and exports a nodemailer transport for sending emails.
 * Uses Gmail SMTP for sending emails with environment-based authentication.
 */

import nodemailer from 'nodemailer';
import config from "../config";

// SMTP Configuration for Gmail
const configOptions = {
  host: config.mailer.host,
  port: Number(config.mailer.port),
  secure: true,
  service: config.mailer.service,
  auth: {
    user: config.mailer.user,
    pass: config.mailer.pass,
  },
};

// Create reusable transporter object using SMTP configuration
const transporter = nodemailer.createTransport(configOptions);

export default transporter;