import copy
import time

from bson import ObjectId
from flask import Blueprint, request

from app import mdb
from lib.discord import get_user_info
from lib.utils import jsonify

CONTENT_KEYS = (
    "background", "characterClasses", "feats", "items", "monsters", "races", "spells"
)
EXCLUDE_CONTENT = {k: False for k in CONTENT_KEYS}
DEFAULT_COMPENDIUM = {
    "name": "Unknown Compendium",
    "owner": None,
    "editors": [],
    "subscribers": [],
    "public": False,
    "active": [],
    "server_active": [],
    "desc": "An unknown compendium",
    "image": "",
    "created": 0,
    "lastEdit": 0,

    "backgrounds": [],
    "characterClasses": [],
    "feats": [],
    "items": [],
    "monsters": [],
    "races": [],
    "spells": [],

    "comments": [],
    "stargazers": []
}

compendiums = Blueprint('homebrew', __name__)


# HELPER FUNCS
def new_default_compendium(user, name: str, public: bool, desc: str, image: str):
    comp = copy.deepcopy(DEFAULT_COMPENDIUM)
    comp.update({
        'name': name,
        'owner': user.to_dict(),
        'public': public,
        'desc': desc,
        'image': image,
        'created': time.time(),
        'lastEdit': time.time()
    })
    return comp


# ROUTES
@compendiums.route('/me', methods=['GET'])
def user_compendiums():
    """Returns a list of user's compendiums, sans content. Used for getting a metadata list."""
    user = get_user_info()
    data = list(mdb.compendiums.find({"$or": [{"owner.id": user.id}, {"editors.id": user.id}]}, EXCLUDE_CONTENT))
    return jsonify(data)


@compendiums.route('', methods=['POST'])
def new_compendium():
    user = get_user_info()
    reqdata = request.json
    if reqdata is None:
        return "No data found", 400
    if 'name' not in reqdata:
        return "Missing name field", 400
    compendium = new_default_compendium(user=user, name=reqdata['name'],
                                        public=bool(reqdata.get('public', False)),
                                        desc=reqdata.get('desc', ''),
                                        image=reqdata.get('image', ''))
    result = mdb.compendiums.insert_one(compendium)
    data = {"success": True, "compendiumId": str(result.inserted_id)}
    return jsonify(data)


@compendiums.route('/<compendium>', methods=['GET'])
def get_compendium(compendium):
    user_id = None
    if 'Authorization' in request.headers:
        user_id = get_user_info().id
    data = mdb.compendiums.find_one({"_id": ObjectId(compendium)})
    if data is None:
        return "Compendium not found", 404
    if not data['public'] and data['owner']['id'] != user_id and user_id not in [e['id'] for e in data['editors']]:
        return "You do not have permission to view this compendium", 403
    return jsonify(data)
