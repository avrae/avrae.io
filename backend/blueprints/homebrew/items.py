from bson import ObjectId
from flask import Blueprint, request

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


@items.route('', methods=['POST'])
def new_pack():
    user = get_user_info()
    reqdata = request.json
    if reqdata is None:
        return "No data found", 400
    if 'name' not in reqdata:
        return "Missing name field", 400
    pack = {
        'name': reqdata['name'],
        'public': bool(reqdata.get('public', False)),
        'desc': reqdata.get('desc', ''),
        'image': reqdata.get('image', ''),
        'owner': user.to_dict(),
        'editors': [],
        'active': [],
        'server_active': [],
        'items': []
    }
    result = mdb.packs.insert_one(pack)
    data = {"success": True, "packId": str(result.inserted_id)}
    return jsonify(data)


@items.route('/<pack>', methods=['GET'])
def get_pack(pack):
    data = mdb.packs.find_one({"_id": ObjectId(pack)})
    if data is None:
        return "Pack not found", 404
    return jsonify(data)


@items.route('/<pack>', methods=['PUT'])
def put_pack(pack):
    user = get_user_info()
    reqdata = request.json
    data = mdb.packs.find_one({"_id": ObjectId(pack)}, ['owner', 'editors'])
    if data is None:
        return "Pack not found", 404
    if user.id != data['owner']['id'] and user.id not in [e['id'] for e in data['editors']]:
        return "You do not have permission to edit this pack", 403
    reqdata.pop('_id')  # ID is in the url

    mdb.packs.update_one({"_id": ObjectId(pack)}, {"$set": reqdata})
    return "Pack updated."


@items.route('/<pack>', methods=['DELETE'])
def delete_pack(pack):
    user = get_user_info()
    data = mdb.packs.find_one({"_id": ObjectId(pack)}, ['owner', 'editors'])
    if data is None:
        return "Pack not found", 404
    if user.id != data['owner']['id']:
        return "You do not have permission to delete this pack", 403
    mdb.packs.delete_one({"_id": ObjectId(pack)})
    return "Pack deleted."
