CREATE DATABASE IF NOT EXISTS plasma_db;
USE plasma_db;

CREATE TABLE IF NOT EXISTS users (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS donors (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  blood_group VARCHAR(5) NOT NULL,
  location VARCHAR(100) NOT NULL,
  contact VARCHAR(20) NOT NULL,
  last_donation_date DATE
);

INSERT INTO donors (name, blood_group, location, contact, last_donation_date) VALUES
('Aarav Sharma','O+','Mumbai','+91 98765 43210','2025-01-15'),
('Priya Patel','A+','Delhi','+91 98765 43211','2024-11-22'),
('Rohan Verma','B+','Bangalore','+91 98765 43212','2025-02-10'),
('Sneha Iyer','AB+','Chennai','+91 98765 43213','2024-12-05'),
('Vikram Singh','O-','Pune','+91 98765 43214','2025-03-18');
