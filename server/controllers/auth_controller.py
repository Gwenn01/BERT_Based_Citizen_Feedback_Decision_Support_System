from flask import request, jsonify
from model.admin import insert_admin, get_admin
import bcrypt

def login_controller():
    try:
        data = request.get_json()

        #  Validate request body
        if not data:
            return jsonify({
                "success": False,
                "message": "Invalid request body"
            }), 400

        email = data.get("email")
        password = data.get("password")

        # Validate fields
        if not email or not password:
            return jsonify({
                "success": False,
                "message": "Email and password are required"
            }), 400

        admin = get_admin(email)

        if not admin:
            return jsonify({
                "success": False,
                "message": "Invalid email or password"
            }), 401

        #  Verify password
        stored_hash = admin["password"]

        if not bcrypt.checkpw(password.encode("utf-8"), stored_hash.encode("utf-8")):
            return jsonify({
                "success": False,
                "message": "Invalid email or password"
            }), 401

        # Login success
        return jsonify({
            "success": True,
            "message": "Login successful",
            "data": {
                "admin_id": admin["admin_id"],
                "fullname": admin["full_name"],
                "email": admin["email"]
            }
        }), 200

    except Exception as e:
        return jsonify({
            "success": False,
            "message": "Server error",
            "error": str(e)
        }), 500
       
    
def insert_admin_controller():
    ...
    insert_admin(
    fullname="Admin User",
    email=" h",
    password="admin123"
    )
