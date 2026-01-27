from database.connection import get_db_connection
import bcrypt

def insert_admin(fullname, email, password):
    conn = get_db_connection()
    cursor = conn.cursor()

    #  Hash the password
    hashed_password = bcrypt.hashpw(
        password.encode('utf-8'),
        bcrypt.gensalt()
    )

    query = """
        INSERT INTO admin (full_name, email, password)
        VALUES (%s, %s, %s);
    """

    cursor.execute(query, (fullname, email, hashed_password))
    conn.commit()
    conn.close()

    return True

def get_admin(email):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    query = """
        SELECT * FROM admin WHERE email = %s;
    """

    cursor.execute(query, (email,))
    result = cursor.fetchone()
    conn.close()

    return result