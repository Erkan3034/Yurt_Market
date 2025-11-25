# Deployment Guide

## Prerequisites

- Python 3.11
- Redis (for Celery broker/result)
- PostgreSQL (production) or SQLite (development)
- Sentry account (optional)

## Environment variables

Copy `.env` example and adjust:

```
DJANGO_SECRET_KEY=...
DJANGO_DEBUG=False
DJANGO_ALLOWED_HOSTS=mydomain.com
DB_USE_SQLITE=false
DB_NAME=...
DB_USER=...
DB_PASSWORD=...
DB_HOST=...
DB_PORT=5432
REDIS_URL=redis://<host>:6379/0
PAYMENT_PROVIDER=stripe
STRIPE_SECRET_KEY=sk_live_xxx
PAYMENT_SUCCESS_URL=https://app.mydomain.com/payment/success
PAYMENT_CANCEL_URL=https://app.mydomain.com/payment/cancel
SENTRY_DSN=https://<key>@sentry.io/<project>
ADMIN_ALLOWED_IPS=10.0.0.1,10.0.0.2
```

## Steps

1. **Install dependencies**
   ```
   pip install -e .[dev]
   ```

2. **Collect static & run migrations**
   ```
   python manage.py collectstatic
   python manage.py migrate
   python scripts/seed_data.py
   python scripts/create_superuser.py
   ```

3. **Start services**
   - Django (gunicorn/uvicorn): `gunicorn config.wsgi:application`
   - Celery worker: `celery -A config worker --loglevel=info`
   - Optional Celery beat for scheduled jobs.

4. **Monitoring**
   - `/health/` endpoint for uptime checks.
   - Sentry automatically initialized if `SENTRY_DSN` provided.

5. **Reverse proxy**
   - Proxy `/` to Django, `/static` & `/media` from filesystem.
   - Ensure HTTPS and secure cookies (already enabled in `prod.py`).

