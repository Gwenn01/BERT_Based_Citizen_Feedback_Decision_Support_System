from database.db_utils import fetch_all


def get_services():
    try:
        query = "SELECT service_id, service_name, description FROM services"
        return fetch_all(query)
    except Exception as e:
        print(" GET SERVICES ERROR:", e)
        return []


def get_services_feedback_count():
    try:
        query = """
            SELECT s.service_id, s.service_name, COUNT(f.feedback_id) AS feedback_count
            FROM services s
            LEFT JOIN feedback f ON s.service_id = f.service_id
            GROUP BY s.service_id, s.service_name
        """
        return fetch_all(query)
    except Exception as e:
        print(" SERVICES COUNT ERROR:", e)
        return []


def get_feedback_by_service(service_id):
    try:
        query = """
            SELECT f.service_type, f.cc1, f.cc2, f.cc3,
                   f.responsiveness, f.reliability, f.facilities,
                   f.communication, f.costs, f.integrity,
                   f.assurance, f.outcome, f.comment
            FROM feedback f
            WHERE f.service_id = %s
        """
        return fetch_all(query, (service_id,))
    except Exception as e:
        print(" SERVICE FEEDBACK ERROR:", e)
        return []