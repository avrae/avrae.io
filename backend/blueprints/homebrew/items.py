from flask import Blueprint

from app import mdb
from lib.discord import get_user_info
from lib.utils import jsonify

items = Blueprint('homebrew/items', __name__)


@items.route('/me', methods=['GET'])
def user_packs():
    user = get_user_info()
    data = list(mdb.packs.find({"$or": [{"owner.id": user.id}, {"editors.id": user.id}]}))
    for pack in data:
        pack['numItems'] = len(pack['items'])
        del pack['items']
    return jsonify(data)
