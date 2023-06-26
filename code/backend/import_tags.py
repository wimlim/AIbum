import json
import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "AIbum.settings")
django.setup()

from models.models import Tag


def load_data_from_json(json_file):
    with open(json_file, 'r') as file:
        data = json.load(file)
    return data


def create_tags(data):
    for name in data:
        Tag.objects.get_or_create(name=name)


def main():
    data = load_data_from_json('tags.json')
    create_tags(data)


if __name__ == "__main__":
    main()

