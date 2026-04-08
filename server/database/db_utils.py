from database.connection import get_db_connection
from psycopg2.extras import RealDictCursor

def fetch_all(query, params=None):
    conn = get_db_connection()
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    
    cursor.execute(query, params)
    result = cursor.fetchall()

    cursor.close()
    conn.close()
    return result


def fetch_one(query, params=None):
    conn = get_db_connection()
    cursor = conn.cursor(cursor_factory=RealDictCursor)

    cursor.execute(query, params)
    result = cursor.fetchone()

    cursor.close()
    conn.close()
    return result


def execute_query(query, params=None):
    conn = get_db_connection()
    cursor = conn.cursor()
   
    cursor.execute(query, params)
    conn.commit()

    cursor.close()
    conn.close()