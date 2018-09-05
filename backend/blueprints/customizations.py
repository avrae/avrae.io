import uuid

from flask import Blueprint, request

from app import mdb, rdb
from lib.discord import get_user_info
from lib.utils import jsonify

customizations = Blueprint('customizations', __name__)


@customizations.route("", methods=["GET"])
def customization_list():
    user = get_user_info()
    data = {
        "aliases": list(mdb.aliases.find({"owner": user.id})),
        "snippets": list(mdb.snippets.find({"owner": user.id})),
        "uvars": list(mdb.uvars.find({"owner": user.id}))
    }
    return jsonify(data)


@customizations.route("/aliases", methods=["GET"])
def alias_list():
    user = get_user_info()
    data = list(mdb.aliases.find({"owner": user.id}))
    return jsonify(data)


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


@customizations.route("/snippets", methods=["GET"])
def snippet_list():
    user = get_user_info()
    data = list(mdb.snippets.find({"owner": user.id}))
    return jsonify(data)


@customizations.route("/snippets/<name>", methods=["POST"])
def snippet_update(name):
    user = get_user_info()
    data = request.json
    if data is None:
        return "No data found", 400
    if 'snippet' not in data:
        return "Missing snippet field", 400
    if not data['snippet']:
        return "Snippet cannot be blank", 400
    if " " in name:
        return "Name cannot contain whitespace", 400
    if len(data['snippet']) > 2000:
        return "Snippet must be less than 2KB", 400
    if len(name) < 2:
        return "Name must be at least 2 characters", 400

    mdb.snippets.update_one({"owner": user.id, "name": name}, {"$set": {"snippet": data['snippet']}}, upsert=True)
    return "Snippet updated."


@customizations.route("/snippets/<name>", methods=["DELETE"])
def snippet_delete(name):
    user = get_user_info()
    result = mdb.snippets.delete_one({"owner": user.id, "name": name})
    if not result.deleted_count:
        return "Snippet not found.", 404
    return "Snippet deleted."


@customizations.route("/uvars", methods=["GET"])
def uvar_list():
    user = get_user_info()
    data = list(mdb.uvars.find({"owner": user.id}))
    return jsonify(data)


@customizations.route("/uvars/<name>", methods=["POST"])
def uvar_update(name):
    user = get_user_info()
    data = request.json
    if data is None:
        return "No data found", 400
    if 'value' not in data:
        return "Missing value field", 400
    if not data['value']:
        return "Value cannot be blank", 400
    if len(data['value']) > 4000:
        return "Value must be less than 4KB", 400

    mdb.uvars.update_one({"owner": user.id, "name": name}, {"$set": {"value": data['value']}}, upsert=True)
    return "Uvar updated."


@customizations.route("/uvars/<name>", methods=["DELETE"])
def uvar_delete(name):
    user = get_user_info()
    result = mdb.uvars.delete_one({"owner": user.id, "name": name})
    if not result.deleted_count:
        return "Uvar not found.", 404
    return "Uvar deleted."


@customizations.route("/gvars", methods=["GET"])
def gvar_list():
    user = get_user_info()
    data = {"owned": list(mdb.gvars.find({"owner": user.id})),
            "editable": list(mdb.gvars.find({"editors": user.id}))}
    return jsonify(data)


@customizations.route("/gvars/owned", methods=["GET"])
def gvar_list_owned():
    user = get_user_info()
    data = list(mdb.gvars.find({"owner": user.id}))
    return jsonify(data)


@customizations.route("/gvars/editable", methods=["GET"])
def gvar_list_editable():
    user = get_user_info()
    data = list(mdb.gvars.find({"editors": user.id}))
    return jsonify(data)


@customizations.route("/gvars", methods=["POST"])
def gvar_new():
    user = get_user_info()
    data = request.json
    if data is None:
        return "No data found", 400
    if 'value' not in data:
        return "Missing value field", 400
    if len(data['value']) > 100000:
        return "Gvars must be less than 100KB", 400
    key = str(uuid.uuid4())
    gvar = {
        "owner": user.id,
        "key": key,
        "owner_name": f"{user.username}#{user.discriminator}",
        "value": data['value'],
        "editors": []
    }
    mdb.gvars.insert_one(gvar)
    return f"Gvar {key} created."


@customizations.route("/gvars/<key>", methods=["POST"])
def gvar_update(key):
    user = get_user_info()
    data = request.json
    gvar = mdb.gvars.find_one({"key": key}, ['owner', 'editors'])
    if data is None:
        return "No data found", 400
    if 'value' not in data:
        return "Missing value field", 400
    if gvar is None:
        return "Gvar not found", 404
    if gvar['owner'] != user.id and user.id not in gvar.get('editors', []):
        return "You do not have permission to edit this gvar", 403
    if len(data['value']) > 100000:
        return "Gvars must be less than 100KB", 400
    mdb.gvars.update_one({"key": key}, {"$set": {"value": data['value']}})
    return "Gvar updated."


@customizations.route("/gvars/<key>", methods=["DELETE"])
def gvar_delete(key):
    user = get_user_info()
    gvar = mdb.gvars.find_one({"key": key}, ['owner'])
    if gvar is None:
        return "Gvar not found", 404
    if gvar['owner'] != user.id:
        return "You do not have permission to delete this gvar", 403
    mdb.gvars.delete_one({"key": key})
    return "Gvar deleted."
