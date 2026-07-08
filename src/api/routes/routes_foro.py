from flask import request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from api.models.models_foro import Foro
from api.database.db import db
from . import api

import cloudinary
import cloudinary.uploader
from api.cloudinary.cloudinary_config import *


@api.route('/foro', methods=["POST"])
@jwt_required()
def create_forum():

    title = request.form.get("title")
    description = request.form.get("description")

    if not title:
        return jsonify({"msg": "Title is required"}), 400

    img_url = None

    if 'img' in request.files:
        file_to_upload = request.files['img']
        if file_to_upload.filename != '':
            try:
                upload_result = cloudinary.uploader.upload(file_to_upload)
                img_url = upload_result["secure_url"]
            except Exception as e:
                return jsonify({"msg": str(e)}), 500

    new_forum = Foro(
        title=title,
        img=img_url,
        description=description,
        user_id=int(get_jwt_identity())
    )

    db.session.add(new_forum)
    db.session.commit()

    return jsonify({
        "msg": "Forum created",
        "forum": new_forum.serialize_foro()
    }), 201


@api.route('/foros', methods=['GET'])
def get_forums():

    forums = Foro.query.all()

    return jsonify([
        forum.serialize_foro()
        for forum in forums
    ]), 200


@api.route("/foro/<int:forum_id>", methods=["GET"])
@jwt_required()
def get_forum_id(forum_id):

    forum = Foro.query.get(forum_id)

    if forum is None:
        return jsonify({
            "msg": "Forum not found"
        }), 404

    user_id = get_jwt_identity()
    foro_data = forum.serialize_foro()
    posts_con_likes = []

    for post in forum.post:
        post_data = post.serialize_post()

        user_liked = False
        if user_id:
            id_user_num = int(user_id)
            for like in post.likedPost:
                if like.user_id == id_user_num:
                        user_liked = True
                        break
                
        post_data["likes_count"] = len(post.likedPost)
        post_data["like_by_user"] = user_liked
        post_data["comments_count"] = len(post.comment)

        posts_con_likes.append(post_data)

    foro_data["posts"] = posts_con_likes

    user_follow = False
    if user_id:
        id_user_num = int(user_id)
        for follow in forum.following:
            if follow.user_id == id_user_num:
                user_follow = True
                break
    
    foro_data["follow_by_user"] = user_follow
    foro_data["followers_count"] = len(forum.following)

    return jsonify(
        foro_data
    ), 200


@api.route("/foro/user/<int:user_id>", methods=["GET"])
def get_foros_from_user(user_id):

    foros = Foro.query.filter_by(
        user_id=user_id
    ).all()

    return jsonify([
        foro.serialize_foro()
        for foro in foros
    ]), 200


@api.route("/foros/search", methods=["GET"])
def get_forum_search():

    query = request.args.get("query")

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


@api.route('/foro/<int:forum_id>', methods=["PUT"])
@jwt_required()
def update_forum(forum_id):

    forum = db.session.get(Foro, forum_id)
    if forum is None:
        return jsonify({"msg": "Forum not found"}), 404

    if int(get_jwt_identity()) != forum.user_id:
        return jsonify({"msg": "You do not have permission to edit this forum"}), 403

    title = request.form.get("title")
    description = request.form.get("description")

    if title:
        forum.title = title
    if description:
        forum.description = description

    if 'img' in request.files:
        file_to_upload = request.files['img']
        if file_to_upload.filename != '':
            try:
                upload_result = cloudinary.uploader.upload(file_to_upload)
                forum.img = upload_result["secure_url"]
            except Exception as e:
                return jsonify({"msg": str(e)}), 500

    db.session.commit()

    return jsonify({
        "msg": "Forum updated",
        "forum": forum.serialize_foro()
    }), 200
