"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models.models_user import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from api.extension import bcrypt

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

    if not bcrypt.check_password_hash(user.password, password):
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


@api.route('/register', methods=['POST'])
def register_user():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    username = data.get('username')

    if email is None or password is None or username is None:
        return jsonify({"msg": "i need email, password and username"}), 400

    email_check = db.session.execute(db.select(User).where(User.email == email)).scalar_one_or_none()
    if email_check is not None:
        return jsonify({"msg": "That email is already registered"}), 400

    username_check = db.session.execute(db.select(User).where(User.username == username)).scalar_one_or_none()
    if username_check is not None:
        return jsonify({"msg": "That username is already taken"}), 400

    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')


    new_user = User(email=email, password=hashed_password, username=username, is_active=True)
    db.session.add(new_user)
    db.session.commit()
    

    return jsonify({"msg": "User created", 'user': new_user.serialize()}), 201


