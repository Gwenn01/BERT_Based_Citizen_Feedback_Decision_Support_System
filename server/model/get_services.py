from database.connection import get_db_connection

def get_services():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    query = "SELECT service_id, service_name, description FROM services"
    cursor.execute(query)

    services = cursor.fetchall()

    cursor.close()
    conn.close()

    return services