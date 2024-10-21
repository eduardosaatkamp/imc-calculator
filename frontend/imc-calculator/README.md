BMI Calculator and Glucose Screening

Project Description

This is a system for BMI calculation and fasting glucose screening, designed to help healthcare professionals monitor glucose levels and calculate the Body Mass Index (BMI) of patients. The system allows for patient data registration, BMI calculation, and monitoring of fasting glucose levels, with data displayed in tables and modals.

Technologies Used

Frontend:
React.js
TypeScript
Styled-components
i18next for internationalization
Axios for HTTP requests

Backend:
Spring Boot
Java 17
Hibernate
PostgreSQL (Docker)
Liquibase for database version control

Features
Patient registration with weight, height, and fasting glucose.
Automatic BMI calculation on the frontend.
Display of the last 10 records of BMI and glucose.
Highlighting of the highest and lowest values in tables.
Internationalization support for Portuguese and English.
Modals for detailed patient data visualization.
Instructions to Start the Project

Prerequisites
Node.js (version 14 or higher)
Yarn or npm
Java 17
Docker and Docker Compose

Start the Backend
Ensure that Docker is running.
Navigate to the backend directory and run:./mvnw spring-boot:run
The backend will be available at http://localhost:8080.
Start the Frontend
Navigate to the frontend directory.
Install dependencies:yarn install
Start the development server:yarn start
The frontend will be available at http://localhost:3000.