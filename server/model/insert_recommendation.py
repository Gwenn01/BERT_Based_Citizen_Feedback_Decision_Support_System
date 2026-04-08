from database.db_utils import execute_query


def insert_recommendation(data):
    try:
        if not data.get("period_id"):
            print(" Skipping recommendation: period_id is None")
            return False

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
            data.get("root_cause"),
            data.get("impact"),
            data["recommendation_action"],
            data["evidence"],
            data["confidence_score"]
        )

        execute_query(query, values)

        print(" Recommendation inserted:", data["category"], "-", data["dimension"])

        return True

    except Exception as e:
        print("❌ insert_recommendation error:", e)
        return False