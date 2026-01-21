from datetime import date, timedelta
from flask import Flask
from flask_cors import CORS
from model.run_tests import run_model_tests
from controllers.run_tests import run_controller_tests
from services.run_tests import run_services_tests
from services.scheduler.run_summary import start_scheduler
from controllers.mapper.generate_summary_mapper import generate_period_summary
#from controllers.mapper.genarate_service_performance_mapper import get_service_performance
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
from routes.admin_overview_routes import admin_overview_bp
#SERVICE PERFORMANCE MONITORING
from routes.admin_service_performance_routes import admin_performance_bp
#RECOMMENDATIONS
from routes.admin_recommendations_routes import admin_recommendation_bp
#SENTIMENT ANALYSIS
app.register_blueprint(health_bp,  url_prefix="/api")
app.register_blueprint(test_db_bp, url_prefix="/api")
app.register_blueprint(survey_bp, url_prefix="/api")
app.register_blueprint(admin_overview_bp, url_prefix="/api")
app.register_blueprint(admin_performance_bp, url_prefix="/api")
app.register_blueprint(admin_recommendation_bp, url_prefix="/api")
# -------------------------------------------------
@app.route("/")
def home():
    return "Server is running"
# -----------------------------------------------
#insert summary manually
# today = date.today()
# generate_period_summary(
#     period_type="daily",
#     start_date=today,
#     end_date=today
# )
# print("generated sucess")

# today = date.today()
# start_date = today - timedelta(days=6)  # includes today (7 days total)
# generate_period_summary(
#     period_type="weekly",
#     start_date=start_date,
#     end_date=today
# )

# today = date.today()
# start_date = today.replace(day=1)
# generate_period_summary(
#     period_type="monthly",
#     start_date=start_date,
#     end_date=today
# )
# -------------------------------------------------
# -------------------------------------------------
# Entry Point
# -------------------------------------------------
if __name__ == "__main__":
    run_model_tests()
    run_controller_tests()
    run_services_tests()
    start_scheduler()
    # aware to uncomments
    # print(get_service_performance())
    # today = date.today()
    # generate_period_summary(
    #     period_type="daily",
    #     start_date=today,
    #     end_date=today
    # )
    # print("generated suces")
    app.run(debug=True)