-- Create jobs table
CREATE TABLE IF NOT EXISTS jobs (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    coin_cost INTEGER NOT NULL,
    posted_by INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create applications table
CREATE TABLE IF NOT EXISTS applications (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    job_id INTEGER NOT NULL,
    applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Seed the jobs table with sample data
INSERT INTO jobs (title, description, coin_cost, posted_by)
VALUES
('Frontend Developer', 'Develop and maintain user-facing features.', 50, 1),
('Backend Developer', 'Build and maintain APIs and services.', 60, 2),
('DevOps Engineer', 'Manage CI/CD pipelines and infrastructure.', 70, 3),
('QA Engineer', 'Ensure the quality and reliability of applications.', 40, 2),
('Data Analyst', 'Analyze data to support business decisions.', 55, 1);
