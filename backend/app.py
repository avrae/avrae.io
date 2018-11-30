import json
import os

from flask import Flask, request
from flask_cors import CORS
from flask_pymongo import PyMongo

import config
from lib import dice
from lib.discord import get_user_info
from lib.redisIO import RedisIO
from lib.utils import jsonify

TESTING = True if os.environ.get("TESTING") else False

app = Flask(__name__)
rdb = RedisIO(config.redis_url if not TESTING else config.test_redis_url)
mdb = PyMongo(app, config.mongo_url if not TESTING else config.test_mongo_url).db

CORS(app)


@app.route('/', methods=["GET"])
def hello_world():
    return 'Hello World!'


@app.route('/user', methods=["GET"])
def user():
    info = get_user_info()
    data = {
        "username": info.username,
        "discriminator": info.discriminator,
        "id": info.id,
        "avatarUrl": info.get_avatar_url()
    }
    return jsonify(data)


@app.route('/userStats', methods=["GET"])
def user_stats():
    info = get_user_info()
    data = {
        "numCharacters": mdb.characters.count_documents({"owner": info.id}),
        "numCustomizations": sum((mdb.aliases.count_documents({"owner": info.id}),
                                  mdb.snippets.count_documents({"owner": info.id})))
    }
    return jsonify(data)


@app.route('/commands', methods=["GET"])
def commands():
    with open("static/commands.json") as f:
        data = json.load(f)
    return jsonify(data)


@app.route('/roll', methods=['GET'])
def roll():
    to_roll = request.args.get('dice') or '1d20'
    adv = request.args.get('adv', 0)
    rolled = dice.roll(to_roll, adv)

    result = {'total': rolled.total, 'result': rolled.result,
              'is_crit': rolled.crit,
              'dice': [part.to_dict() for part in rolled.raw_dice.parts]}

    return jsonify(result)


from blueprints.characters import characters
from blueprints.customizations import customizations
from blueprints.bot import bot
app.register_blueprint(characters, url_prefix="/characters")
app.register_blueprint(customizations, url_prefix="/customizations")
app.register_blueprint(bot, url_prefix="/bot")

from blueprints.homebrew.items import items
app.register_blueprint(items, url_prefix="/homebrew/items")


if __name__ == '__main__':
    app.run()
