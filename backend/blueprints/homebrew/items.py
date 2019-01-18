import json

from bson import ObjectId
from flask import Blueprint, request

from app import mdb
from lib.discord import get_user_info
from lib.utils import jsonify

items = Blueprint('homebrew/items', __name__)

PACK_FIELDS = ("name", "owner", "editors", "subscribers", "public", "active", "server_active", "desc", "image", "items",
               "numItems")
ITEM_FIELDS = ("name", "meta", "desc", "image")
IGNORED_FIELDS = ("_id", "active", "server_active", "subscribers")


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
        'subscribers': [],
        'active': [],
        'server_active': [],
        'items': []
    }
    result = mdb.packs.insert_one(pack)
    data = {"success": True, "packId": str(result.inserted_id)}
    return jsonify(data)


@items.route('/<pack>', methods=['GET'])
def get_pack(pack):
    user_id = None
    if 'Authorization' in request.headers:
        user_id = get_user_info().id
    data = mdb.packs.find_one({"_id": ObjectId(pack)})
    if data is None:
        return "Pack not found", 404
    if not data['public'] and data['owner']['id'] != user_id and user_id not in [e['id'] for e in data['editors']]:
        return "You do not have permission to view this pack", 403
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

    print(reqdata)

    for field in IGNORED_FIELDS:
        if field in reqdata:
            reqdata.pop(field)

    if not all(k in PACK_FIELDS for k in reqdata):
        return "Invalid field", 400
    if "items" in reqdata:
        for item in reqdata['items']:
            if not all(k in ITEM_FIELDS for k in item):
                return f"Invalid item field in {item}", 400

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


@items.route('/srd', methods=['GET'])
def srd_items():
    with open('static/template-items.json') as f:
        _items = json.load(f)
    return jsonify(_items)
