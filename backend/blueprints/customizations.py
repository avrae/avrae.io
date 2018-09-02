from bson.json_util import dumps
from flask import Blueprint

from app import mdb
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


@customizations.route("/aliases/<name>", methods=["DELETE"])
def alias_delete(name):
    user = get_user_info()
    result = mdb.aliases.delete_one({"owner": user.id, "name": name})
    if not result.deleted_count:
        return "Alias not found.", 404
    return "Alias deleted."
