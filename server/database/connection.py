# import mysql.connector

# # def get_db_connection():
# #     return mysql.connector.connect(
# #         host="proctorvisio-db.cpsaym88mr8u.ap-southeast-2.rds.amazonaws.com",
# #         port="3306",
# #         user="admin",
# #         password="gwen0701",
# #         database="citizen_feedback_db"
# # #     )
# import sqlite3

# def get_db_connection():
#     conn = sqlite3.connect("citizen_feedback.db")
#     conn.row_factory = sqlite3.Row
#     return conn

import psycopg2
import os
from dotenv import load_dotenv

load_dotenv()

def get_db_connection():
    conn = psycopg2.connect(
        host=os.getenv("DB_HOST"),
        database=os.getenv("DB_NAME"),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD"),
        port=os.getenv("DB_PORT")
    )
    return conn