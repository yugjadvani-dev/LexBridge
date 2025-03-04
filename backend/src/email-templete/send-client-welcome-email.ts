/**
 * Client Welcome Email Module
 * Handles sending welcome emails to newly registered clients using nodemailer.
 */

import { SendMailOptions } from 'nodemailer';
import transporter from '../utils/nodemailer';
import { Mailer } from "../types/mailer";
import config from "../config";

/**
 * Sends a welcome email to a newly registered client
 * @param client - Object containing client's name and email
 * @returns Promise that resolves when email is sent
 * @throws Error if email sending fails
 */
export const sendClientWelcomeEmail = async (client: Mailer): Promise<void> => {
  try {
    const mailOptions: SendMailOptions = {
      from: config.mailer.user,
      to: client.email,
      subject: `Welcome to LexBridge, ${client.name}!`,
      html: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Welcome to LexBridge</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            padding-bottom: 20px;
        }
        .header h1 {
            color: #333;
        }
        .content {
            text-align: center;
            color: #555;
        }
        .cta-button {
            display: inline-block;
            margin-top: 20px;
            padding: 10px 20px;
            background: #007BFF;
            color: #ffffff !important;
            text-decoration: none;
            border-radius: 5px;
            font-size: 16px;
        }
        .footer {
            text-align: center;
            margin-top: 20px;
            font-size: 12px;
            color: #777;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Welcome to LexBridge!</h1>
        </div>
        <div class="content">
            <p>We’re thrilled to have you on board. LexBridge connects you with trusted legal experts for secure communication, easy booking, and transparent pricing.</p>
            <p>Start exploring our platform today and get expert legal assistance at your fingertips.</p>
            <a href="#" class="cta-button">Find a Lawyer</a>
        </div>
        <div class="footer">
            <p>If you have any questions, feel free to <a href="#">contact us</a>.</p>
            <p>&copy; 2025 LexBridge. All Rights Reserved.</p>
        </div>
    </div>
</body>
</html>
`};

    await transporter.sendMail(mailOptions);
    console.log('Welcome email sent successfully to:', client.email);
  } catch (error) {
    console.error('Error while sending welcome email:', error);
    throw error;
  }
};