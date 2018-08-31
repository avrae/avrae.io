import os

from flask import Flask, request, jsonify
from pymongo import MongoClient

import config
from lib.discord import get_user_info
from lib.redisIO import RedisIO

TESTING = True if os.environ.get("TESTING") else False

app = Flask(__name__)
rdb = RedisIO(config.redis_url if not TESTING else config.test_redis_url)
mdb = MongoClient(config.mongo_url if not TESTING else config.test_mongo_url).avrae


@app.route('/', methods=["GET"])
def hello_world():
    return 'Hello World!'


@app.route('/userStats', methods=["GET"])
def user_stats():
    user_info = get_user_info(request.headers['Authorization'])
    data = {
        "username": user_info.username,
        "discriminator": user_info.discriminator,
        "id": user_info.id,
        "avatarUrl": user_info.get_avatar_url(),
        "numCharacters": mdb.characters.count_documents({"owner": user_info.id}),
        "numCustomizations": sum(mdb.aliases.count_documents({"owner": user_info.id}),
                                 mdb.snippets.count_documents({"owner": user_info.id}))
    }
    return jsonify(data)


if __name__ == '__main__':
    app.run()
