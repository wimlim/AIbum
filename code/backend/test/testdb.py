import psycopg2

conn = psycopg2.connect(database="aibum", user="postgres", password="postgres", host="localhost", port="5432")

print("Opened database successfully")

