import json
import psycopg2

def load_data_from_json(json_file):
    with open(json_file, 'r') as file:
        data = json.load(file)
    return data

def create_tags(data, connection):
    cursor = connection.cursor()
    for name in data:
        cursor.execute("INSERT INTO pg_model_tag (name) VALUES (%s)", (name,))
    connection.commit()
    cursor.close()

def main():
    data = load_data_from_json('tags.json')
    connection = psycopg2.connect(database="aibum", user="postgres", password="postgres", host="localhost", port="5432")
    create_tags(data, connection)
    connection.close()

if __name__ == "__main__":
    main()
    