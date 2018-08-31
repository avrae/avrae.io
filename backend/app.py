import os

from bson.json_util import dumps
from flask import Flask, request
from flask_cors import CORS
from flask_pymongo import PyMongo

import config
from lib.discord import get_user_info
from lib.redisIO import RedisIO

TESTING = True if os.environ.get("TESTING") else False

app = Flask(__name__)
rdb = RedisIO(config.redis_url if not TESTING else config.test_redis_url)
mdb = PyMongo(app, config.mongo_url if not TESTING else config.test_mongo_url).db

CORS(app)


@app.route('/', methods=["GET"])
def hello_world():
    return 'Hello World!'


@app.route('/userInfo', methods=["GET"])
def user_info():
    info = get_user_info()
    data = {
        "username": info.username,
        "discriminator": info.discriminator,
        "id": info.id,
        "avatarUrl": info.get_avatar_url(),
        "numCharacters": mdb.characters.count_documents({"owner": info.id}),
        "numCustomizations": sum((mdb.aliases.count_documents({"owner": info.id}),
                                  mdb.snippets.count_documents({"owner": info.id})))
    }
    return dumps(data)


from blueprints.characters import characters

app.register_blueprint(characters, url_prefix="/characters")

if __name__ == '__main__':
    app.run()
