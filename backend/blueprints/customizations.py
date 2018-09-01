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
