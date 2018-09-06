from functools import wraps

from flask import Blueprint, request, abort

from app import mdb
from lib.utils import jsonify

bot = Blueprint('bot', __name__)


def requires_secret(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        app_3pp_secret = request.headers.get('authorization')
        if mdb.api_apps.find_one({"key": app_3pp_secret}) is None:
            return abort(403)
        return f(*args, **kwargs)

    return decorated_function


@bot.route("characters/<user>/active", methods=["GET"])
@requires_secret
def active_char(user):
    char = mdb.characters.find_one({"owner": user, "active": True})
    if char is None:
        return "User has no character active, or user does not exist", 404
    return jsonify(char)


@bot.route("characters/<user>/<_id>", methods=["GET"])
@requires_secret
def user_char(user, _id):
    char = mdb.characters.find_one({"owner": user, "upstream": _id})
    if char is None:
        return "Character not found", 404
    return jsonify(char)
