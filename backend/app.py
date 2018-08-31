import os

from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient

import config
from lib.discord import get_user_info
from lib.redisIO import RedisIO

TESTING = True if os.environ.get("TESTING") else False

app = Flask(__name__)
rdb = RedisIO(config.redis_url if not TESTING else config.test_redis_url)
mdb = MongoClient(config.mongo_url if not TESTING else config.test_mongo_url).avrae

CORS(app)


@app.route('/', methods=["GET"])
def hello_world():
    return 'Hello World!'


@app.route('/userInfo', methods=["GET"])
def user_info():
    info = get_user_info(request.headers['Authorization'])
    data = {
        "username": info.username,
        "discriminator": info.discriminator,
        "id": info.id,
        "avatarUrl": info.get_avatar_url(),
        "numCharacters": 0,  # mdb.characters.count_documents({"owner": info.id}),
        "numCustomizations": 0  # sum(mdb.aliases.count_documents({"owner": info.id}),
        # mdb.snippets.count_documents({"owner": info.id}))
    }
    return jsonify(data)


if __name__ == '__main__':
    app.run()
