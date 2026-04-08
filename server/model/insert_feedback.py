from database.db_utils import fetch_one


def insert_feedback(service_id, feedback_data):
    try:
        print(" INSERT FEEDBACK CALLED")

        query = """
            INSERT INTO feedback (
                service_id, client_type, gender, age, place, religion,
                service_type, employee_name,
                cc1, cc2, cc3,
                responsiveness, reliability, facilities, communication,
                costs, integrity, assurance, outcome,
                comment, sentiment, confidence, email, phone_number, service_date
            ) VALUES (
                %s, %s, %s, %s, %s, %s,
                %s, %s,
                %s, %s, %s,
                %s, %s, %s, %s,
                %s, %s, %s, %s,
                %s, %s, %s, %s, %s, %s
            )
            RETURNING feedback_id;
        """

        values = (
            service_id,
            feedback_data["client_type"],
            feedback_data["gender"],
            feedback_data["age"],
            feedback_data["place"],
            feedback_data.get("religion"),
            feedback_data["service_type"],
            feedback_data.get("employee_name"),
            feedback_data["cc1"],
            feedback_data["cc2"],
            feedback_data["cc3"],
            feedback_data["responsiveness"],
            feedback_data["reliability"],
            feedback_data["facilities"],
            feedback_data["communication"],
            feedback_data["costs"],
            feedback_data["integrity"],
            feedback_data["assurance"],
            feedback_data["outcome"],
            feedback_data.get("comment"),
            feedback_data.get("sentiment"),
            feedback_data.get("confidence"),
            feedback_data.get("email"),
            feedback_data.get("phone_number"),
            feedback_data["service_date"]
        )
        print(" VALUES:", values)

        result = fetch_one(query, values)

        print(" DB RESULT:", result)

        if result:
            print(" INSERT SUCCESS, ID:", result["feedback_id"])
            return result["feedback_id"]
        else:
            print(" NO RESULT RETURNED")
            return None

    except Exception as e:
        print(" insert_feedback error:", e)
        return None