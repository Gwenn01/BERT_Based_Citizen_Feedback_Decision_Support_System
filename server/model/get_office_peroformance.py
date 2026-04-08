from database.db_utils import fetch_all


def get_all_office_performance():
    try:
        query = """
            SELECT DISTINCT ON (office_id) *
            FROM office_performance
            ORDER BY office_id, created_at DESC
        """

        return fetch_all(query)

    except Exception as e:
        print("❌ GET OFFICE PERFORMANCE ERROR:", e)
        return []