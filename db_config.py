from dotenv import load_dotenv
import os


load_dotenv()

DATABASE = os.environ.get("DATABASE")
HOST = os.environ.get("HOST")
PORT = int(os.environ.get("PORT"))
USER = os.environ.get("USER")
PASSWORD = os.environ.get("PASSWORD")

DB_CONFIG = {
    'connections': {
        'default': {
            'engine': 'tortoise.backends.asyncpg',
            'credentials': {
                'database': DATABASE,
                'host': HOST,
                'port': PORT,
                'user': USER,
                'password': PASSWORD,
            }
        }
    },
    'apps': {
        'models': {
            'models': ['models'],
            'default_connection': 'default'
        }
    }
}
