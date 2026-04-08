from database.db_utils import execute_query


def insert_recommendation(data):
    try:
        query = """
            INSERT INTO recommendations (
                period_id,
                category,
                dimension,
                severity,
                issue,
                root_cause,
                impact,
                recommendation_action,
                evidence,
                confidence_score
            )
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """

        values = (
            data["period_id"],
            data["category"],
            data["dimension"],
            data["severity"],
            data["issue"],
            data["root_cause"],
            data["impact"],
            data["recommendation_action"],
            data["evidence"],
            data["confidence_score"]
        )

        execute_query(query, values)

        return True

    except Exception as e:
        print("❌ insert_recommendation error:", e)
        return False