from flask import Blueprint

from app import mdb
from lib.discord import get_user_info
from lib.utils import jsonify

characters = Blueprint('characters', __name__)


@characters.route('', methods=["GET"])
def character_list():
    user = get_user_info()
    data = list(mdb.characters.find({"owner": user.id}))
    return jsonify(data)


@characters.route('/meta', methods=["GET"])
def meta():
    user = get_user_info()
    data = list(mdb.characters.find({"owner": user.id},
                                    ["upstream", "active", "name", "description", "image", "levels"]))
    return jsonify(data)
