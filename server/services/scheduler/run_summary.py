from apscheduler.schedulers.background import BackgroundScheduler
from datetime import date, timedelta

from controllers.mapper.generate_summary_mapper import generate_period_summary
from controllers.mapper.genarate_service_performance_mapper import get_service_performance
from model.insert_office_performance import insert_service_performance


def start_scheduler():
    scheduler = BackgroundScheduler()
    scheduler.add_job(run_daily_summary, "cron", hour=0)
    scheduler.add_job(run_weekly_summary, "cron", day_of_week="mon")
    scheduler.start()

def run_daily_summary():
    today = date.today()
    
    generate_period_summary(
        period_type="daily",
        start_date=today,
        end_date=today
    )


def run_weekly_summary():
    today = date.today()
    start_date = today - timedelta(days=7)

    generate_period_summary(
        period_type="weekly",
        start_date=start_date,
        end_date=today
    )


def run_monthly_summary():
    today = date.today()
    start_date = today.replace(day=1)

    generate_period_summary(
        period_type="monthly",
        start_date=start_date,
        end_date=today
    )
    data = get_service_performance()
    for office_name, metrics in data.items():
        insert_service_performance({
            "office_name": office_name,
            "citizens_charter_awareness": metrics["citizens_charter_awareness"],
            "survey_analysis": metrics["survey_analysis"],
            "sentiment_analysis": metrics["sentiment_analysis"],
            "total_feedback_count": metrics["total_feedback_count"]
        })


def start_scheduler():
    scheduler = BackgroundScheduler()

    # Daily at 12:00 AM
    scheduler.add_job(
        run_daily_summary,
        trigger="cron",
        hour=0,
        minute=0
    )

    # Weekly every Monday at 12:05 AM
    scheduler.add_job(
        run_weekly_summary,
        trigger="cron",
        day_of_week="mon",
        hour=0,
        minute=5
    )

    # Monthly on the 1st at 12:10 AM
    scheduler.add_job(
        run_monthly_summary,
        trigger="cron",
        day=1,
        hour=0,
        minute=10
    )

    scheduler.start()
