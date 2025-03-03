/*
 # LexBridge System Schema

 1. New Tables
    - `clients`
        - `id` (uuid, primary key)
        - `username` (varchar)
        - `avatar` (varchar)
        - `first_name` (varchar)
        - `last_name` (varchar)
        - `email` (varchar)
        - `phone_number` (varchar)
        - `password` (varchar)
        - `is_verified` (boolean)
        - `created_at` (timestamp)
        - `updated_at` (timestamp)

 2. Security
    - Enable RLS on tables
    - Add policies
 */

 -- Create clients table
CREATE TABLE IF NOT EXISTS clients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(255) NOT NULL UNIQUE,
    avatar VARCHAR(255),
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    email VARCHAR(255) NOT NULL UNIQUE,
    phone_number VARCHAR(255) UNIQUE,
    password VARCHAR(255) NOT NULL,
    is_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
)