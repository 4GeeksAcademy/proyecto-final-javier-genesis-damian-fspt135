from flask import Flask, request, jsonify, url_for, Blueprint
from flask_cors import CORS

api = Blueprint('api', __name__)
CORS(api)

from . import routes_user
from . import routes_tag
from . import routes_foro
from . import routes_post
