from bson import ObjectId
from flask import Blueprint, request

from app import mdb
from lib.discord import get_user_info
from lib.utils import jsonify

spells = Blueprint('homebrew/spells', __name__)

TOME_FIELDS = ("name", "owner", "editors", "public", "active", "server_active", "desc", "image", "spells", "numSpells")
SPELL_FIELDS = ("name", "level", "school", "classes", "subclasses", "time", "range", "components", "duration", "ritual",
                "description", "higherlevels", "concentration", "automation", "image")
IGNORED_FIELDS = ("_id", "active", "server_active")


@spells.route('/me', methods=['GET'])
def user_tomes():
    user = get_user_info()
    data = list(mdb.tomes.find({"$or": [{"owner.id": user.id}, {"editors.id": user.id}]}))
    for tome in data:
        tome['numSpells'] = len(tome['spells'])
        del tome['spells']
    return jsonify(data)


@spells.route('', methods=['POST'])
def new_tome():
    user = get_user_info()
    reqdata = request.json
    if reqdata is None:
        return "No data found", 400
    if 'name' not in reqdata:
        return "Missing name field", 400
    tome = {
        'name': reqdata['name'],
        'public': bool(reqdata.get('public', False)),
        'desc': reqdata.get('desc', ''),
        'image': reqdata.get('image', ''),
        'owner': user.to_dict(),
        'editors': [],
        'active': [],
        'server_active': [],
        'spells': []
    }
    result = mdb.tomes.insert_one(tome)
    data = {"success": True, "tomeId": str(result.inserted_id)}
    return jsonify(data)


@spells.route('/<tome>', methods=['GET'])
def get_tome(tome):
    user_id = None
    if 'Authorization' in request.headers:
        user_id = get_user_info().id
    data = mdb.tomes.find_one({"_id": ObjectId(tome)})
    if data is None:
        return "Tome not found", 404
    if not data['public'] and data['owner']['id'] != user_id and user_id not in [e['id'] for e in data['editors']]:
        return "You do not have permission to view this tome", 403
    return jsonify(data)


@spells.route('/<tome>', methods=['PUT'])
def put_tome(tome):
    user = get_user_info()
    reqdata = request.json
    data = mdb.tomes.find_one({"_id": ObjectId(tome)}, ['owner', 'editors'])
    if data is None:
        return "Tome not found", 404
    if user.id != data['owner']['id'] and user.id not in [e['id'] for e in data['editors']]:
        return "You do not have permission to edit this tome", 403

    for field in IGNORED_FIELDS:
        reqdata.pop(field)

    if not all(k in TOME_FIELDS for k in reqdata):
        return "Invalid field", 400
    if "spells" in reqdata:
        for spell in reqdata['spells']:
            if not all(k in SPELL_FIELDS for k in spell):
                return f"Invalid spell field in {spell}", 400

    mdb.tomes.update_one({"_id": ObjectId(tome)}, {"$set": reqdata})
    return "Tome updated."


@spells.route('/<tome>', methods=['DELETE'])
def delete_tome(tome):
    user = get_user_info()
    data = mdb.tomes.find_one({"_id": ObjectId(tome)}, ['owner', 'editors'])
    if data is None:
        return "Tome not found", 404
    if user.id != data['owner']['id']:
        return "You do not have permission to delete this tome", 403
    mdb.tomes.delete_one({"_id": ObjectId(tome)})
    return "Tome deleted."

# @spells.route('/srd', methods=['GET'])
# def srd_spells():
#     with open('static/template-spells.json') as f:
#         _spells = json.load(f)
#     return jsonify(_spells)