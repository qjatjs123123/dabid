FROM python:3.11.0

WORKDIR /app
COPY . .

EXPOSE 8000

RUN pip install --upgrade pip
RUN pip install -r requirements.txt
CMD ["python", "-m", "flask", "run"]