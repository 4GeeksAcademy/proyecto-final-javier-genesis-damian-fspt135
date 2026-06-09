"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token
from werkzeug.security import check_password_hash

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/login', methods=['POST'])
def login():

    body = request.get_json()

    if not body:
     return jsonify({
        "success": False,
        "msg": "Datos inválidos"
    }), 400

    email = body.get("email")
    password = body.get("password")

    if not email or not password:
        return jsonify({
            "success": False,
            "msg": "Email y contraseña son obligatorios"
        }), 400

    user = User.query.filter_by(email=email).first()

    if not user:
        return jsonify({
            "success": False,
            "msg": "Credenciales incorrectas"
        }), 401

    if not check_password_hash(user.password, password):
        return jsonify({
            "success": False,
            "msg": "Credenciales incorrectas"
        }), 401

    token = create_access_token(
        identity=str(user.id)
    )

    return jsonify({
        "success": True,
        "token": token,
        "user": {
            "id": user.id,
            "username": user.username,
            "email": user.email
        }
    }), 200