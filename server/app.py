from flask import Flask
from flask_cors import CORS
from model.run_tests import run_model_tests
from controllers.run_tests import run_controller_tests
from services.run_tests import run_services_tests
# -------------------------------------------------
# Flask Initialization
# -------------------------------------------------
app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": "*"}})

# -------------------------------------------------
# Register Blueprints
# -------------------------------------------------
from routes.health_routes import health_bp
# TEST CONNECTION
from routes.test_db_routes import test_db_bp

# ARTIFICIAL INTELLIGENCE
# SURVEY
from routes.get_survey_routes import survey_bp
#SERVICE PERFORMANCE MONITORING
#SENTIMENT ANALYSIS
app.register_blueprint(health_bp,  url_prefix="/api")
app.register_blueprint(test_db_bp, url_prefix="/api")
app.register_blueprint(survey_bp, url_prefix="/api")
# -------------------------------------------------
@app.route("/")
def home():
    return "Server is running"
# -------------------------------------------------
# Entry Point
# -------------------------------------------------
if __name__ == "__main__":
    run_model_tests()
    run_controller_tests()
    run_services_tests()
    app.run(debug=True)