import mysql.connector

def get_db_connection():
    return mysql.connector.connect(
        host="proctorvisio-db.cpsaym88mr8u.ap-southeast-2.rds.amazonaws.com",
        port="3306",
        user="admin",
        password="gwen0701",
        database="citizen_feedback_db"
    )
