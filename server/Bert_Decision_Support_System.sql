SHOW DATABASES;

USE citizen_feedback_db;
SHOW TABLES;

SELECT * FROM admin;
SELECT * FROM recommendations;
SELECT * FROM sentiment_performance_summary;
SELECT * FROM services;
SELECT * From feedback;
SELECT * FROM sentiment_performance_summary;
SELECT * FROM office_performance;

   

CREATE TABLE feedback (
    feedback_id INT AUTO_INCREMENT PRIMARY KEY,
	service_id int,
    client_type ENUM('General Public', 'Government Employee', 'Business/Private'),
    gender ENUM('Male', 'Female'),
    age INT,

    office_visited VARCHAR(100),
    service_type VARCHAR(100),
    employee_name VARCHAR(100),

    responsiveness INT,
    reliability INT,
    facilities INT,
    communication INT,
    costs INT,
    integrity INT,
    assurance INT,
    outcome INT,

    comment TEXT,
    service_date date,
    sentiment ENUM('positive', 'neutral', 'negative'),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
ALTER TABLE feedback
ADD COLUMN sentiment ENUM('positive', 'neutral', 'negative') AFTER comment;

ALTER TABLE feedback
ADD COLUMN confidence DECIMAL(5,4) AFTER sentiment;


CREATE TABLE service_performance_summary (
    performance_id INT AUTO_INCREMENT PRIMARY KEY,
    service_id INT NOT NULL,

    period_type ENUM('daily', 'weekly', 'monthly') NOT NULL,
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,

    average_score DECIMAL(4,2),
    status ENUM('Poor', 'Average', 'Good'),
    recommendation TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (service_id)
        REFERENCES services(service_id)
        ON DELETE CASCADE
);
ALTER TABLE service_performance_summary
ADD COLUMN key_issues TEXT AFTER status;


CREATE TABLE sentiment_performance_summary (
    summary_id INT AUTO_INCREMENT PRIMARY KEY,
    service_id INT NOT NULL,

    period_type ENUM('daily', 'weekly', 'monthly') NOT NULL,
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,

    positive_count INT,
    neutral_count INT,
    negative_count INT,

    dominant_sentiment ENUM('positive', 'neutral', 'negative'),
    key_issues TEXT,
    ai_recommendation TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (service_id)
        REFERENCES services(service_id)
        ON DELETE CASCADE
);

INSERT INTO services (service_id, service_name, description, is_active) VALUES
(1, 'Business Permit Licensing', 'Issuance of business permits', 1),
(2, 'City Health Office', 'Medical and health services', 1),
(3, 'Civil Registry', 'Birth, death, and marriage certificates', 1),
(4, 'City Engineering', 'Building permits and zoning', 1),
(5, 'Social Welfare (DSWD)', 'Aid and counseling services', 1);


-- 1. FIRST: Insert Reference Services (Required for Foreign Keys)
INSERT INTO Service (service_id, service_name, description, is_active) VALUES
(1, 'Business Permit Licensing', 'Issuance of business permits', 1),
(2, 'City Health Office', 'Medical and health services', 1),
(3, 'Civil Registry', 'Birth, death, and marriage certificates', 1),
(4, 'City Engineering', 'Building permits and zoning', 1),
(5, 'Social Welfare (DSWD)', 'Aid and counseling services', 1);

-- 2. SECOND: Insert 100 Rows of Feedback Data (Without Sentiment)
INSERT INTO feedback (
    service_id, client_type, gender, age, office_visited, service_type, employee_name, 
    responsiveness, reliability, facilities, communication, costs, integrity, assurance, outcome, 
    comment, service_date, created_at
) VALUES 
-- --- TODAY (Last 24 Hours: ~15 Entries) ---
(1, 'General Public', 'Male', 34, 'Business Permit Office', 'New Application', 'Maria Santos', 5, 5, 4, 5, 5, 5, 5, 5, 'Very fast transaction today.', CURDATE(), NOW()),
(2, 'General Public', 'Female', 68, 'Health Center', 'Checkup', 'Dr. Reyes', 5, 5, 5, 5, 5, 5, 5, 5, 'Doctor was very kind to seniors.', CURDATE(), NOW() - INTERVAL 1 HOUR),
(3, 'General Public', 'Male', 21, 'Civil Registry', 'Birth Cert', 'John Doe', 3, 3, 2, 3, 4, 4, 3, 3, 'Queue was long but staff was okay.', CURDATE(), NOW() - INTERVAL 2 HOUR),
(4, 'General Public', 'Female', 45, 'Engineering', 'Building Permit', 'Engr. Lim', 1, 2, 2, 1, 2, 3, 2, 1, 'Staff was rude and unhelpful.', CURDATE(), NOW() - INTERVAL 3 HOUR),
(1, 'Business/Private', 'Male', 50, 'Business Permit Office', 'Renewal', 'Clerk A', 5, 4, 5, 5, 4, 5, 5, 5, 'Renewal process has improved significantly.', CURDATE(), NOW() - INTERVAL 4 HOUR),
(5, 'General Public', 'Female', 30, 'DSWD', 'Financial Aid', 'Mrs. Go', 5, 5, 3, 5, 5, 5, 5, 5, 'Very accommodating to PWDs.', CURDATE(), NOW() - INTERVAL 5 HOUR),
(2, 'General Public', 'Male', 29, 'Health Center', 'Vaccination', 'Nurse Joy', 4, 4, 4, 4, 5, 4, 4, 4, 'Clean facility, free service.', CURDATE(), NOW() - INTERVAL 6 HOUR),
(3, 'General Public', 'Female', 33, 'Civil Registry', 'Marriage Cert', 'Mr. Tan', 2, 3, 1, 2, 3, 3, 2, 2, 'Aircon was not working, very hot.', CURDATE(), NOW() - INTERVAL 7 HOUR),
(1, 'Business/Private', 'Male', 41, 'Business Permit Office', 'Assessment', 'Mrs. Lee', 5, 5, 5, 5, 5, 5, 5, 5, 'Excellent automated system.', CURDATE(), NOW() - INTERVAL 8 HOUR),
(4, 'General Public', 'Male', 55, 'Engineering', 'Zoning', 'Engr. Cruz', 3, 3, 3, 3, 3, 3, 3, 3, 'Just an average experience.', CURDATE(), NOW() - INTERVAL 9 HOUR),
(5, 'Government Employee', 'Female', 70, 'DSWD', 'Senior ID', 'Staff B', 5, 5, 5, 5, 5, 5, 5, 5, 'Priority lane was very helpful.', CURDATE(), NOW() - INTERVAL 10 HOUR),
(2, 'General Public', 'Male', 25, 'Health Center', 'Lab Test', 'Tech A', 1, 1, 2, 1, 1, 2, 1, 1, 'Lost my results, very incompetent.', CURDATE(), NOW() - INTERVAL 11 HOUR),
(3, 'General Public', 'Female', 19, 'Civil Registry', 'Document Request', 'Staff C', 4, 4, 3, 4, 4, 5, 4, 4, 'Good service but system was offline briefly.', CURDATE(), NOW() - INTERVAL 12 HOUR),
(1, 'Business/Private', 'Female', 38, 'Business Permit Office', 'Payment', 'Cashier', 5, 5, 5, 5, 5, 5, 5, 5, 'Cashier was fast and friendly.', CURDATE(), NOW() - INTERVAL 13 HOUR),
(4, 'General Public', 'Male', 44, 'Engineering', 'Inspection', 'Inspector X', 2, 2, 2, 1, 2, 1, 2, 2, 'Asked for snacks, felt like a bribe.', CURDATE(), NOW() - INTERVAL 14 HOUR),

-- --- LAST 7 DAYS (Weekly Data: ~35 Entries) ---
(1, 'General Public', 'Male', 28, 'Business Permit Office', 'Inquiry', 'Help Desk', 4, 4, 4, 5, 5, 4, 4, 4, 'Guard was helpful in directing me.', CURDATE() - INTERVAL 2 DAY, NOW() - INTERVAL 2 DAY),
(2, 'General Public', 'Female', 31, 'Health Center', 'Dental', 'Dr. Smile', 5, 5, 4, 5, 5, 5, 5, 5, 'Painless tooth extraction.', CURDATE() - INTERVAL 2 DAY, NOW() - INTERVAL 2 DAY),
(3, 'General Public', 'Male', 40, 'Civil Registry', 'Birth Cert', 'Window 1', 1, 2, 1, 1, 2, 2, 1, 1, 'Staff was texting while serving me.', CURDATE() - INTERVAL 3 DAY, NOW() - INTERVAL 3 DAY),
(5, 'General Public', 'Male', 52, 'DSWD', 'Consultation', 'Social Worker', 5, 5, 5, 5, 5, 5, 5, 5, 'Very empathetic staff.', CURDATE() - INTERVAL 3 DAY, NOW() - INTERVAL 3 DAY),
(4, 'General Public', 'Female', 36, 'Engineering', 'Permit', 'Staff D', 3, 3, 3, 3, 3, 3, 3, 3, 'Took exactly 3 days as promised.', CURDATE() - INTERVAL 3 DAY, NOW() - INTERVAL 3 DAY),
(1, 'Business/Private', 'Male', 49, 'Business Permit Office', 'Renewal', 'Officer A', 5, 5, 5, 5, 5, 5, 5, 5, 'Smooth transaction.', CURDATE() - INTERVAL 4 DAY, NOW() - INTERVAL 4 DAY),
(2, 'Government Employee', 'Female', 65, 'Health Center', 'Checkup', 'Nurse B', 4, 4, 3, 4, 5, 4, 4, 4, 'Good, but waiting area needs more chairs.', CURDATE() - INTERVAL 4 DAY, NOW() - INTERVAL 4 DAY),
(3, 'General Public', 'Male', 22, 'Civil Registry', 'PSA Request', 'Window 2', 2, 1, 2, 2, 3, 2, 2, 2, 'System was down all morning.', CURDATE() - INTERVAL 4 DAY, NOW() - INTERVAL 4 DAY),
(5, 'General Public', 'Female', 27, 'DSWD', 'Counseling', 'Counselor', 5, 5, 5, 5, 5, 5, 5, 5, 'Life saving advice.', CURDATE() - INTERVAL 5 DAY, NOW() - INTERVAL 5 DAY),
(1, 'General Public', 'Male', 33, 'Business Permit Office', 'New Biz', 'Clerk B', 5, 5, 5, 5, 5, 5, 5, 5, 'One stop shop really works.', CURDATE() - INTERVAL 5 DAY, NOW() - INTERVAL 5 DAY),
(4, 'Business/Private', 'Male', 58, 'Engineering', 'Occupancy Permit', 'Engr. Y', 1, 1, 1, 1, 1, 1, 1, 1, 'Too much red tape.', CURDATE() - INTERVAL 5 DAY, NOW() - INTERVAL 5 DAY),
(2, 'General Public', 'Female', 24, 'Health Center', 'Prenatal', 'Midwife', 5, 5, 4, 5, 5, 5, 5, 5, 'Midwife was very gentle.', CURDATE() - INTERVAL 5 DAY, NOW() - INTERVAL 5 DAY),
(3, 'General Public', 'Male', 47, 'Civil Registry', 'Death Cert', 'Staff E', 4, 4, 4, 3, 4, 4, 4, 4, 'Efficient handling of sensitive documents.', CURDATE() - INTERVAL 6 DAY, NOW() - INTERVAL 6 DAY),
(5, 'General Public', 'Female', 39, 'DSWD', 'ID Application', 'Staff F', 3, 3, 2, 3, 5, 3, 3, 3, 'Form was hard to understand.', CURDATE() - INTERVAL 6 DAY, NOW() - INTERVAL 6 DAY),
(1, 'Business/Private', 'Male', 42, 'Business Permit Office', 'Assessment', 'Assessor', 5, 5, 5, 5, 5, 5, 5, 5, 'Fair assessment.', CURDATE() - INTERVAL 6 DAY, NOW() - INTERVAL 6 DAY),
(2, 'Government Employee', 'Male', 72, 'Health Center', 'Vitamins', 'Volunteer', 5, 5, 5, 5, 5, 5, 5, 5, 'Thank you for free medicines.', CURDATE() - INTERVAL 6 DAY, NOW() - INTERVAL 6 DAY),
(3, 'General Public', 'Female', 29, 'Civil Registry', 'Inquiry', 'Guard', 2, 2, 2, 1, 5, 2, 2, 2, 'Guard wouldn''t let me in without ID.', CURDATE() - INTERVAL 7 DAY, NOW() - INTERVAL 7 DAY),
(4, 'General Public', 'Male', 35, 'Engineering', 'Electrical', 'Electrician', 4, 4, 4, 4, 4, 4, 4, 4, 'Standard procedure followed.', CURDATE() - INTERVAL 7 DAY, NOW() - INTERVAL 7 DAY),
(5, 'General Public', 'Female', 31, 'DSWD', 'Aid', 'Cashier', 5, 5, 5, 5, 5, 5, 5, 5, 'Released immediately.', CURDATE() - INTERVAL 7 DAY, NOW() - INTERVAL 7 DAY),
(1, 'Business/Private', 'Male', 53, 'Business Permit Office', 'Fire Safety', 'BFP', 5, 5, 4, 5, 5, 5, 5, 5, 'Inspection was thorough.', CURDATE() - INTERVAL 7 DAY, NOW() - INTERVAL 7 DAY),
(2, 'General Public', 'Female', 20, 'Health Center', 'Medical Cert', 'Doctor', 1, 2, 3, 1, 2, 2, 1, 1, 'Doctor was late for 2 hours.', CURDATE() - INTERVAL 7 DAY, NOW() - INTERVAL 7 DAY),
(3, 'General Public', 'Male', 44, 'Civil Registry', 'Correction', 'Atty. A', 4, 5, 4, 5, 4, 5, 5, 4, 'Legal advice was sound.', CURDATE() - INTERVAL 7 DAY, NOW() - INTERVAL 7 DAY),
(4, 'Business/Private', 'Female', 39, 'Engineering', 'Signage', 'Staff G', 3, 3, 3, 3, 3, 3, 3, 3, 'Process is okay.', CURDATE() - INTERVAL 7 DAY, NOW() - INTERVAL 7 DAY),
(5, 'Government Employee', 'Female', 66, 'DSWD', 'Pension', 'Staff H', 5, 5, 5, 5, 5, 5, 5, 5, 'Received pension on time.', CURDATE() - INTERVAL 7 DAY, NOW() - INTERVAL 7 DAY),
(1, 'General Public', 'Male', 26, 'Business Permit Office', 'Inquiry', 'Desk', 5, 5, 5, 5, 5, 5, 5, 5, 'All questions answered.', CURDATE() - INTERVAL 7 DAY, NOW() - INTERVAL 7 DAY),
(2, 'General Public', 'Male', 41, 'Health Center', 'Therapy', 'PT', 5, 5, 5, 5, 5, 5, 5, 5, 'Physical therapist is skilled.', CURDATE() - INTERVAL 7 DAY, NOW() - INTERVAL 7 DAY),
(3, 'General Public', 'Female', 30, 'Civil Registry', 'Late Reg', 'Staff I', 2, 2, 2, 2, 2, 2, 2, 2, 'Too many requirements asked.', CURDATE() - INTERVAL 7 DAY, NOW() - INTERVAL 7 DAY),
(4, 'General Public', 'Male', 48, 'Engineering', 'Plumbing', 'Engr. Z', 4, 4, 4, 4, 4, 4, 4, 4, 'Approved quickly.', CURDATE() - INTERVAL 7 DAY, NOW() - INTERVAL 7 DAY),
(5, 'General Public', 'Female', 23, 'DSWD', 'Scholarship', 'Interviewer', 5, 5, 5, 5, 5, 5, 5, 5, 'Hope I get approved.', CURDATE() - INTERVAL 7 DAY, NOW() - INTERVAL 7 DAY),
(1, 'Business/Private', 'Male', 55, 'Business Permit Office', 'Retirement', 'Officer B', 3, 3, 3, 3, 3, 3, 3, 3, 'Closing business is hard.', CURDATE() - INTERVAL 7 DAY, NOW() - INTERVAL 7 DAY),
(2, 'General Public', 'Female', 34, 'Health Center', 'Checkup', 'Doc', 5, 5, 4, 5, 5, 5, 5, 5, 'Very professional.', CURDATE() - INTERVAL 7 DAY, NOW() - INTERVAL 7 DAY),
(3, 'General Public', 'Male', 37, 'Civil Registry', 'CENOMAR', 'Window 3', 1, 1, 1, 1, 1, 1, 1, 1, 'They lost my application form.', CURDATE() - INTERVAL 7 DAY, NOW() - INTERVAL 7 DAY),
(4, 'General Public', 'Female', 42, 'Engineering', 'Fencing', 'Staff J', 4, 4, 3, 4, 4, 4, 4, 4, 'Issued within the day.', CURDATE() - INTERVAL 7 DAY, NOW() - INTERVAL 7 DAY),
(5, 'Government Employee', 'Male', 75, 'DSWD', 'Aid', 'Staff K', 5, 5, 5, 5, 5, 5, 5, 5, 'Very respectful to elders.', CURDATE() - INTERVAL 7 DAY, NOW() - INTERVAL 7 DAY),

-- --- LAST 30 DAYS (Monthly Data: ~50 Entries) ---
(1, 'Business/Private', 'Male', 45, 'Business Permit Office', 'Renewal', 'Clerk', 5, 5, 5, 5, 5, 5, 5, 5, 'Fastest renewal ever.', CURDATE() - INTERVAL 10 DAY, NOW() - INTERVAL 10 DAY),
(2, 'General Public', 'Female', 29, 'Health Center', 'Emergency', 'Nurse', 5, 5, 4, 5, 5, 5, 5, 5, 'Attended to immediately.', CURDATE() - INTERVAL 11 DAY, NOW() - INTERVAL 11 DAY),
(3, 'General Public', 'Male', 33, 'Civil Registry', 'Birth Cert', 'Window 1', 2, 2, 2, 2, 2, 2, 2, 2, 'Printer was broken.', CURDATE() - INTERVAL 12 DAY, NOW() - INTERVAL 12 DAY),
(4, 'General Public', 'Female', 50, 'Engineering', 'Permit', 'Staff', 4, 4, 4, 4, 4, 4, 4, 4, 'Fairly standard service.', CURDATE() - INTERVAL 13 DAY, NOW() - INTERVAL 13 DAY),
(5, 'General Public', 'Male', 38, 'DSWD', 'ID', 'Staff', 5, 5, 5, 5, 5, 5, 5, 5, 'Accessible ramp available.', CURDATE() - INTERVAL 14 DAY, NOW() - INTERVAL 14 DAY),
(1, 'Business/Private', 'Female', 40, 'Business Permit Office', 'Sanitary', 'Inspector', 1, 1, 1, 1, 1, 1, 1, 1, 'Inspector was very rude.', CURDATE() - INTERVAL 15 DAY, NOW() - INTERVAL 15 DAY),
(2, 'General Public', 'Male', 21, 'Health Center', 'Checkup', 'Doc', 3, 3, 3, 3, 5, 3, 3, 3, 'It was okay, free medicine.', CURDATE() - INTERVAL 16 DAY, NOW() - INTERVAL 16 DAY),
(3, 'General Public', 'Female', 27, 'Civil Registry', 'Marriage', 'Officer', 5, 5, 5, 5, 5, 5, 5, 5, 'Solemnizing officer was nice.', CURDATE() - INTERVAL 17 DAY, NOW() - INTERVAL 17 DAY),
(4, 'Business/Private', 'Male', 60, 'Engineering', 'Mechanical', 'Engr', 4, 4, 4, 4, 4, 4, 4, 4, 'Technical expertise is good.', CURDATE() - INTERVAL 18 DAY, NOW() - INTERVAL 18 DAY),
(5, 'Government Employee', 'Female', 70, 'DSWD', 'Burial Asst', 'Staff', 5, 5, 5, 5, 5, 5, 5, 5, 'Big help to our family.', CURDATE() - INTERVAL 19 DAY, NOW() - INTERVAL 19 DAY),
(1, 'General Public', 'Male', 32, 'Business Permit Office', 'Mayor Permit', 'Staff', 4, 4, 3, 4, 4, 4, 4, 4, 'Queue management needs work.', CURDATE() - INTERVAL 20 DAY, NOW() - INTERVAL 20 DAY),
(2, 'General Public', 'Female', 25, 'Health Center', 'Checkup', 'Nurse', 5, 5, 5, 5, 5, 5, 5, 5, 'Cleanest CR in city hall.', CURDATE() - INTERVAL 21 DAY, NOW() - INTERVAL 21 DAY),
(3, 'General Public', 'Male', 41, 'Civil Registry', 'Doc Request', 'Clerk', 1, 2, 1, 1, 2, 2, 1, 1, 'Wait time was 4 hours.', CURDATE() - INTERVAL 22 DAY, NOW() - INTERVAL 22 DAY),
(4, 'General Public', 'Female', 36, 'Engineering', 'Demolition', 'Inspector', 3, 3, 3, 3, 3, 3, 3, 3, 'Processing is average.', CURDATE() - INTERVAL 23 DAY, NOW() - INTERVAL 23 DAY),
(5, 'General Public', 'Male', 29, 'DSWD', 'Solo Parent', 'Staff', 5, 5, 5, 5, 5, 5, 5, 5, 'Fast approval for solo parents.', CURDATE() - INTERVAL 24 DAY, NOW() - INTERVAL 24 DAY),
(1, 'Business/Private', 'Female', 48, 'Business Permit Office', 'Cedula', 'Window', 5, 5, 5, 5, 5, 5, 5, 5, 'In and out in 5 minutes.', CURDATE() - INTERVAL 25 DAY, NOW() - INTERVAL 25 DAY),
(2, 'Government Employee', 'Male', 80, 'Health Center', 'Checkup', 'Doc', 5, 5, 5, 5, 5, 5, 5, 5, 'Doctor listens well.', CURDATE() - INTERVAL 26 DAY, NOW() - INTERVAL 26 DAY),
(3, 'General Public', 'Female', 18, 'Civil Registry', 'Birth Cert', 'Staff', 2, 2, 2, 2, 2, 2, 2, 2, 'Staff was grumpy.', CURDATE() - INTERVAL 27 DAY, NOW() - INTERVAL 27 DAY),
(4, 'Business/Private', 'Male', 55, 'Engineering', 'Electronics', 'Engr', 4, 4, 4, 4, 4, 4, 4, 4, 'Professional engineers.', CURDATE() - INTERVAL 28 DAY, NOW() - INTERVAL 28 DAY),
(5, 'General Public', 'Female', 33, 'DSWD', 'Financial', 'Social Worker', 5, 5, 5, 5, 5, 5, 5, 5, 'Very grateful for the aid.', CURDATE() - INTERVAL 29 DAY, NOW() - INTERVAL 29 DAY),
(1, 'General Public', 'Male', 30, 'Business Permit Office', 'Inquiry', 'Desk', 3, 3, 3, 3, 3, 3, 3, 3, 'Information was unclear.', CURDATE() - INTERVAL 12 DAY, NOW() - INTERVAL 12 DAY),
(2, 'General Public', 'Female', 28, 'Health Center', 'Checkup', 'Nurse', 5, 5, 5, 5, 5, 5, 5, 5, 'Very compassionate.', CURDATE() - INTERVAL 13 DAY, NOW() - INTERVAL 13 DAY),
(3, 'General Public', 'Male', 35, 'Civil Registry', 'Cert', 'Staff', 4, 4, 4, 4, 4, 4, 4, 4, 'Good job.', CURDATE() - INTERVAL 14 DAY, NOW() - INTERVAL 14 DAY),
(4, 'General Public', 'Female', 44, 'Engineering', 'Permit', 'Engr', 1, 1, 2, 1, 1, 1, 1, 1, 'Nobody was in the office.', CURDATE() - INTERVAL 15 DAY, NOW() - INTERVAL 15 DAY),
(5, 'Government Employee', 'Male', 69, 'DSWD', 'Pension', 'Staff', 5, 5, 5, 5, 5, 5, 5, 5, 'Efficient payout.', CURDATE() - INTERVAL 16 DAY, NOW() - INTERVAL 16 DAY),
(1, 'Business/Private', 'Female', 37, 'Business Permit Office', 'Renewal', 'Clerk', 5, 5, 5, 5, 5, 5, 5, 5, 'Great improvement.', CURDATE() - INTERVAL 17 DAY, NOW() - INTERVAL 17 DAY),
(2, 'General Public', 'Male', 24, 'Health Center', 'Lab', 'Tech', 2, 2, 3, 2, 4, 2, 2, 2, 'Lab results delayed.', CURDATE() - INTERVAL 18 DAY, NOW() - INTERVAL 18 DAY),
(3, 'General Public', 'Female', 31, 'Civil Registry', 'Marriage', 'Staff', 5, 5, 5, 5, 5, 5, 5, 5, 'Smooth process.', CURDATE() - INTERVAL 19 DAY, NOW() - INTERVAL 19 DAY),
(4, 'Business/Private', 'Male', 50, 'Engineering', 'Zoning', 'Engr', 4, 4, 3, 4, 4, 4, 4, 4, 'Acceptable service.', CURDATE() - INTERVAL 20 DAY, NOW() - INTERVAL 20 DAY),
(5, 'General Public', 'Female', 26, 'DSWD', 'Help', 'Worker', 5, 5, 5, 5, 5, 5, 5, 5, 'Helped me a lot.', CURDATE() - INTERVAL 21 DAY, NOW() - INTERVAL 21 DAY),
(1, 'General Public', 'Male', 40, 'Business Permit Office', 'Permit', 'Staff', 1, 1, 1, 1, 1, 1, 1, 1, 'System offline all day.', CURDATE() - INTERVAL 22 DAY, NOW() - INTERVAL 22 DAY),
(2, 'General Public', 'Female', 35, 'Health Center', 'Checkup', 'Doc', 5, 5, 5, 5, 5, 5, 5, 5, 'Very inclusive.', CURDATE() - INTERVAL 23 DAY, NOW() - INTERVAL 23 DAY),
(3, 'General Public', 'Male', 20, 'Civil Registry', 'PSA', 'Clerk', 3, 3, 3, 3, 3, 3, 3, 3, 'Average wait time.', CURDATE() - INTERVAL 24 DAY, NOW() - INTERVAL 24 DAY),
(4, 'General Public', 'Female', 46, 'Engineering', 'Permit', 'Engr', 5, 5, 5, 5, 5, 5, 5, 5, 'Approved immediately.', CURDATE() - INTERVAL 25 DAY, NOW() - INTERVAL 25 DAY),
(5, 'Government Employee', 'Male', 71, 'DSWD', 'ID', 'Staff', 4, 4, 4, 4, 4, 4, 4, 4, 'Friendly staff.', CURDATE() - INTERVAL 26 DAY, NOW() - INTERVAL 26 DAY),
(1, 'Business/Private', 'Female', 52, 'Business Permit Office', 'Closure', 'Officer', 2, 2, 2, 2, 2, 2, 2, 2, 'Confusing requirements.', CURDATE() - INTERVAL 27 DAY, NOW() - INTERVAL 27 DAY),
(2, 'General Public', 'Male', 33, 'Health Center', 'Checkup', 'Nurse', 5, 5, 5, 5, 5, 5, 5, 5, 'Excellent service.', CURDATE() - INTERVAL 28 DAY, NOW() - INTERVAL 28 DAY),
(3, 'General Public', 'Female', 29, 'Civil Registry', 'Birth', 'Window', 5, 5, 5, 5, 5, 5, 5, 5, 'No complaints.', CURDATE() - INTERVAL 29 DAY, NOW() - INTERVAL 29 DAY),
(4, 'Business/Private', 'Male', 45, 'Engineering', 'Elec', 'Engr', 4, 4, 4, 4, 4, 4, 4, 4, 'Good work.', CURDATE() - INTERVAL 15 DAY, NOW() - INTERVAL 15 DAY),
(5, 'General Public', 'Female', 30, 'DSWD', 'Aid', 'Staff', 3, 3, 3, 3, 3, 3, 3, 3, 'Long line.', CURDATE() - INTERVAL 16 DAY, NOW() - INTERVAL 16 DAY),
(1, 'General Public', 'Male', 39, 'Business Permit Office', 'Inquiry', 'Desk', 5, 5, 5, 5, 5, 5, 5, 5, 'Very helpful.', CURDATE() - INTERVAL 17 DAY, NOW() - INTERVAL 17 DAY),
(2, 'Government Employee', 'Female', 64, 'Health Center', 'Labs', 'Tech', 5, 5, 5, 5, 5, 5, 5, 5, 'Fast results.', CURDATE() - INTERVAL 18 DAY, NOW() - INTERVAL 18 DAY),
(3, 'General Public', 'Male', 27, 'Civil Registry', 'Cert', 'Staff', 1, 1, 1, 1, 1, 1, 1, 1, 'Lost my files.', CURDATE() - INTERVAL 19 DAY, NOW() - INTERVAL 19 DAY),
(4, 'General Public', 'Female', 35, 'Engineering', 'Permit', 'Staff', 5, 5, 5, 5, 5, 5, 5, 5, 'Polite staff.', CURDATE() - INTERVAL 20 DAY, NOW() - INTERVAL 20 DAY),
(5, 'General Public', 'Male', 21, 'DSWD', 'Scholar', 'Interviewer', 5, 5, 5, 5, 5, 5, 5, 5, 'Thank you.', CURDATE() - INTERVAL 21 DAY, NOW() - INTERVAL 21 DAY);


SELECT COUNT(*) 
FROM feedback 
WHERE client_type IS NULL;

UPDATE feedback
SET client_type = 'General Public'
WHERE client_type IS NULL
LIMIT 1000;

SELECT client_type FROM feedback WHERE feedback_id = 5;

SHOW DATABASES;

USE citizen_feedback_db;
SHOW TABLES;

SELECT * FROM services;
SELECT * FROM survey_periods;
SELECT * FROM survey_results;
SELECT * FROM sentiment_results;
SELECT * FROM citizen_charter_awareness;
SELECT * FROM feedback;
SELECT * FROM recommendations;
SELECT * FROM office_performance;
SELECT * FROM admin;

UPDATE services SET service_name = "Assessor's Office" WHERE service_id = 2;

SET SQL_SAFE_UPDATES = 0;
DESCRIBE feedback;

--

-- Reset IDs (optional)
ALTER TABLE recommendations AUTO_INCREMENT = 1;
ALTER TABLE sentiment_results AUTO_INCREMENT = 1;
ALTER TABLE survey_results AUTO_INCREMENT = 1;
ALTER TABLE citizen_charter_awareness AUTO_INCREMENT = 1;
ALTER TABLE survey_periods AUTO_INCREMENT = 1;

CREATE TABLE office_performance (
    office_id INT AUTO_INCREMENT PRIMARY KEY,
    office_name VARCHAR(255) NOT NULL UNIQUE,

    citizens_charter_awareness DECIMAL(5,2) NOT NULL,
    survey_analysis DECIMAL(3,2) NOT NULL,
    sentiment_analysis DECIMAL(5,2) NOT NULL,

    total_feedback_count INT NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
);

show databases;
DELETE FROM feedback WHERE feedback_id = 127;
