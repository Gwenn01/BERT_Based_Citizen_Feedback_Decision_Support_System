from flask import Flask
from flask_cors import CORS

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
from routes.ai.ai_routes import ai_bp
# SURVEY
from routes.survey.survey_routes import survey_bp
#SERVICE PERFORMANCE MONITORING
from routes.service_performance.get_service_performance_routes import service_performance_monitoring_bp
#SENTIMENT ANALYSIS


app.register_blueprint(health_bp,  url_prefix="/api")
app.register_blueprint(test_db_bp, url_prefix="/api")
app.register_blueprint(ai_bp, url_prefix="/api")
app.register_blueprint(survey_bp, url_prefix="/api")
app.register_blueprint(service_performance_monitoring_bp, url_prefix="/api")

# -------------------------------------------------
# Entry Point
# -------------------------------------------------
if __name__ == "__main__":
    app.run(debug=True)
