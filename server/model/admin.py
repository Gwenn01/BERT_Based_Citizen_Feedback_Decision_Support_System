from database.db_utils import fetch_one, execute_query
import bcrypt


def insert_admin(fullname, email, password):
    try:
        # Hash password
        hashed_password = bcrypt.hashpw(
            password.encode('utf-8'),
            bcrypt.gensalt()
        )

        query = """
            INSERT INTO admin (full_name, email, password)
            VALUES (%s, %s, %s)
        """

        execute_query(query, (fullname, email, hashed_password))
        return True

    except Exception as e:
        print("Error in insert_admin:", e)
        return False


def get_admin(email):
    try:
        query = """
            SELECT * FROM admin WHERE email = %s
        """

        result = fetch_one(query, (email,))
        return result

    except Exception as e:
        print("Error in get_admin:", e)
        return None