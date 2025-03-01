/*
 # LexBridge System Schema

 1. New Tables
    - `clients`
        - `id` (uuid, primary key)
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
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
)