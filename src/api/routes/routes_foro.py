from flask import request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from api.routes.routes_user import api
from api.models.models_foro import Foro
from api.database.db import db






@api.route('/foro', methods=["POST"])
@jwt_required()
def create_forum():
    data = request.get_json()

    title = data.get("title")
    img = data.get("img")
    description = data.get("description")

    if not title:
        return jsonify({"msg": "Title is required"}), 400
    
    new_forum = Foro (
        title = title,
        img = img,
        description = description,
        user_id = get_jwt_identity()
    )

    db.session.add(new_forum)
    db.session.commit()

    return jsonify({"msg": "Forum created", "forum": new_forum.serialize_foro()}), 200

@api.route('/foros', methods=['GET'])
def get_forums():

    forums = Foro.query.all()

    result = []

    for forum in forums:
        result.append(
            forum.serialize_foro()
        )

    return jsonify(result), 200



@api.route("/foro/<int:forum_id>", methods=["GET"])
def get_forum_id(forum_id):

    forum = Foro.query.get(forum_id)

    if forum is None:
        return jsonify({"msg": "Forum not found" }), 400
    
    return jsonify(
        forum.serialize_foro()
    ), 200


@api.route("/foros/search", methods=["GET"])
def get_forum_search():

    query  = request.args.get("query")

    if not query:
        return jsonify({
            "msg": "Query is required"
        }), 400

    forums = Foro.query.filter(
        Foro.title.ilike(f"%{query}%")
    ).all()

    return jsonify([
        forum.serialize_foro()
        for forum in forums
    ]), 200