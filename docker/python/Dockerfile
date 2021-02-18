FROM python
WORKDIR /app

ENV PYTHONUNBUFFERED 1

COPY ./api/requirements.txt /app/
RUN pip install --upgrade pip && pip install -r requirements.txt
COPY ./api /app/

EXPOSE 8000

# Dockerfile を更新したらdocker-compose build を実行する⇒docker-compose up -d だけでは変更が反映されない。