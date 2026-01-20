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

def get_services_feedback_count():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    query = """
        SELECT s.service_id, s.service_name, COUNT(f.feedback_id) AS feedback_count
        FROM services s
        LEFT JOIN feedback f ON s.service_id = f.service_id
        GROUP BY s.service_id, s.service_name
    """
    cursor.execute(query)

    services_feedback = cursor.fetchall()

    cursor.close()
    conn.close()

    return services_feedback

def get_feedback_by_service(service_id):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    query = """
        SELECT f.service_type, f.cc1, f.cc2, f.cc3,
               f.responsiveness, f.reliability, f.facilities,
               f.communication, f.costs, f.integrity,
               f.assurance, f.outcome, f.comment
        FROM feedback f
        LEFT JOIN services s ON f.service_id = s.service_id
        WHERE s.service_id = %s
        GROUP BY f.service_type, f.cc1, f.cc2, f.cc3,
                 f.responsiveness, f.reliability, f.facilities,
                 f.communication, f.costs, f.integrity,
                 f.assurance, f.outcome, f.comment
    """

    cursor.execute(query, (service_id,))  # 
    services_avg_rating = cursor.fetchall()

    cursor.close()
    conn.close()

    return services_avg_rating
