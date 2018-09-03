from bson.json_util import dumps
from flask import Blueprint, request

from app import mdb, rdb
from lib.discord import get_user_info

customizations = Blueprint('customizations', __name__)


@customizations.route("", methods=["GET"])
def customization_list():
    user = get_user_info()
    data = {
        "aliases": list(mdb.aliases.find({"owner": user.id})),
        "snippets": list(mdb.snippets.find({"owner": user.id})),
        "uvars": list(mdb.uvars.find({"owner": user.id}))
    }
    return dumps(data)


@customizations.route("/aliases", methods=["GET"])
def alias_list():
    user = get_user_info()
    data = list(mdb.aliases.find({"owner": user.id}))
    return dumps(data)


@customizations.route("/aliases/<name>", methods=["POST"])
def alias_update(name):
    user = get_user_info()
    data = request.json
    if data is None:
        return "No data found", 400
    if 'commands' not in data:
        return "Missing commands field", 400
    if not data['commands']:
        return "Commands cannot be blank", 400
    if " " in name:
        return "Name cannot contain whitespace", 400
    if name in rdb.jget("default_commands", []):
        return "Alias is already built-in", 409
    if len(data['commands']) > 4000:
        return "Alias commands must be less than 4KB", 400
    
    mdb.aliases.update_one({"owner": user.id, "name": name}, {"$set": {"commands": data['commands']}}, upsert=True)
    return "Alias updated."


@customizations.route("/aliases/<name>", methods=["DELETE"])
def alias_delete(name):
    user = get_user_info()
    result = mdb.aliases.delete_one({"owner": user.id, "name": name})
    if not result.deleted_count:
        return "Alias not found.", 404
    return "Alias deleted."
