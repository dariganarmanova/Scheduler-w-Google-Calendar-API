CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    user_name VARCHAR(100) NOT NULL,
    user_surname VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL
);

CREATE TABLE courses (
    id SERIAL PRIMARY KEY,
    course_code VARCHAR(20) UNIQUE NOT NULL,
    course_name VARCHAR(255) NOT NULL,
    instructor VARCHAR(100)
);

INSERT INTO courses (course_code, course_name, instructor, schedule) 
VALUES 
('CSE22101', 'Data Structures', 'Taesik Gong', 'MON WED 10:30-11:45 (104-E104)'),
('CSE26101', 'Computer Architecture', 'Seongil Wi', 'TUE THU 14:30-15:45 (104-E206)'),
('CSE27101', 'Principles of Programming Languages', 'Jooyong Yi', 'TUE THU 10:30-11:45 (104-E104)'),
('CSE32101', 'Database Systems', 'Yeon-Chang Lee', 'TUE THU 13:00-14:15 (104-E104)'),
('CSE33201', 'Theory of Computation', 'Antoine Vigneron', 'MON WED 13:00-14:15 (104-E104)'),
('CSE36201', 'Artificial Intelligence', 'Hyounghun Kim', 'TUE THU 16:00-17:15 (104-E104)'),
('CSE40301', 'Deep Learning', 'Jooyeon Kim', 'TUE THU 09:00-10:15 (108-U110)'),
('CSE41201', 'Parallel Computing', 'Woongki Baek', 'MON WED 10:30-11:45 (106-T201)'),
('CSE46601', 'Cloud Computing', 'Young-ri Choi', 'TUE THU 10:30-11:45 (106-T202)'),
('CSE47201', 'Computer Vision', 'Seungryul Baek', 'MON WED 14:30-15:45 (104-E104)')