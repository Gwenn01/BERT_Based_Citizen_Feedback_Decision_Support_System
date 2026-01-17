from database.connection import get_db_connection

def get_feedback():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM feedback")
    feedback = cursor.fetchall()
    cursor.close()
    conn.close()
    return feedback