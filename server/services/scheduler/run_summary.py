from apscheduler.schedulers.background import BackgroundScheduler
from datetime import date, timedelta

from server.controllers.mapper.generate_summary_mapper import generate_period_summary


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
