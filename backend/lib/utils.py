from bson.json_util import dumps
from flask import Response


def jsonify(data):
    return Response(dumps(data), mimetype="application/json")
