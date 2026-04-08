-- Enable foreign keys
PRAGMA foreign_keys = ON;

-- =========================
-- SERVICES
-- =========================
CREATE TABLE services (
    service_id INTEGER PRIMARY KEY AUTOINCREMENT,
    service_name TEXT,
    description TEXT,
    is_active INTEGER DEFAULT 1
);

-- =========================
-- ADMIN
-- =========================
CREATE TABLE admin (
    admin_id INTEGER PRIMARY KEY AUTOINCREMENT,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password BLOB NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================
-- FEEDBACK
-- =========================
CREATE TABLE feedback (
    feedback_id INTEGER PRIMARY KEY AUTOINCREMENT,
    service_id INTEGER,

    client_type TEXT CHECK(client_type IN ('General Public', 'Government Employee', 'Business/Private')),
    gender TEXT CHECK(gender IN ('Male', 'Female')),
    age INTEGER,

    place TEXT,
    religion TEXT,

    service_type TEXT,
    employee_name TEXT,

    cc1 INTEGER,
    cc2 INTEGER,
    cc3 INTEGER,

    responsiveness INTEGER,
    reliability INTEGER,
    facilities INTEGER,
    communication INTEGER,
    costs INTEGER,
    integrity INTEGER,
    assurance INTEGER,
    outcome INTEGER,

    comment TEXT,

    sentiment TEXT CHECK(sentiment IN ('positive', 'neutral', 'negative')),
    confidence REAL,

    email TEXT,
    phone_number TEXT,

    service_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (service_id)
        REFERENCES services(service_id)
        ON DELETE CASCADE
);

-- =========================
-- SURVEY PERIODS
-- =========================
CREATE TABLE survey_periods (
    period_id INTEGER PRIMARY KEY AUTOINCREMENT,
    period_name TEXT CHECK(period_name IN ('daily', 'weekly', 'monthly')) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (period_name, start_date, end_date)
);

-- =========================
-- SURVEY RESULTS
-- =========================
CREATE TABLE survey_results (
    survey_result_id INTEGER PRIMARY KEY AUTOINCREMENT,
    period_id INTEGER NOT NULL,

    overall_avg REAL,
    responsiveness_avg REAL,
    reliability_avg REAL,
    facilities_avg REAL,
    communication_avg REAL,
    cost_avg REAL,
    integrity_avg REAL,
    assurance_avg REAL,
    outcome_avg REAL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (period_id)
        REFERENCES survey_periods(period_id)
        ON DELETE CASCADE
);

-- =========================
-- SENTIMENT RESULTS
-- =========================
CREATE TABLE sentiment_results (
    sentiment_result_id INTEGER PRIMARY KEY AUTOINCREMENT,
    period_id INTEGER NOT NULL,

    total_comments INTEGER,
    positive_count INTEGER,
    neutral_count INTEGER,
    negative_count INTEGER,

    positive_percent REAL,
    neutral_percent REAL,
    negative_percent REAL,

    sentiment_score REAL,
    average_confidence REAL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (period_id)
        REFERENCES survey_periods(period_id)
        ON DELETE CASCADE
);

-- =========================
-- CITIZEN CHARTER AWARENESS
-- =========================
CREATE TABLE citizen_charter_awareness (
    awareness_id INTEGER PRIMARY KEY AUTOINCREMENT,
    period_id INTEGER NOT NULL,

    cc1_awareness_percent REAL,
    cc2_awareness_percent REAL,
    cc3_awareness_percent REAL,

    overall_awareness REAL,

    status TEXT CHECK(status IN ('Low', 'Moderate', 'High')),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (period_id)
        REFERENCES survey_periods(period_id)
        ON DELETE CASCADE
);

-- =========================
-- RECOMMENDATIONS
-- =========================
CREATE TABLE recommendations (
    recommendation_id INTEGER PRIMARY KEY AUTOINCREMENT,
    period_id INTEGER NOT NULL,

    category TEXT,
    dimension TEXT,
    severity TEXT CHECK(severity IN ('Low', 'Medium', 'High', 'Critical')),

    issue TEXT,
    root_cause TEXT,
    impact TEXT,
    recommendation_action TEXT,
    evidence TEXT,

    confidence_score REAL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (period_id)
        REFERENCES survey_periods(period_id)
        ON DELETE CASCADE
);

-- =========================
-- OFFICE PERFORMANCE
-- =========================
CREATE TABLE office_performance (
    office_id INTEGER PRIMARY KEY AUTOINCREMENT,
    office_name TEXT NOT NULL UNIQUE,

    citizens_charter_awareness REAL NOT NULL,
    survey_analysis REAL NOT NULL,
    sentiment_analysis REAL NOT NULL,

    total_feedback_count INTEGER NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);