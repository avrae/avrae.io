import os

from flask import Flask
from pymongo import MongoClient

import config
from lib.redisIO import RedisIO

TESTING = True if os.environ.get("TESTING") else False

DISCORD_API = 'https://discordapp.com/api'

app = Flask(__name__)
rdb = RedisIO(config.redis_url if not TESTING else config.test_redis_url)
mdb = MongoClient(config.mongo_url if not TESTING else config.test_mongo_url).avrae


@app.route('/', methods=["GET"])
def hello_world():
    return 'Hello World!'


if __name__ == '__main__':
    app.run()
