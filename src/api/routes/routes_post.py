from flask import request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from api.models.model_post import Post
from api.models.model_like_post import LikePost
from api.database.db import db
from api.service.save_img import save_img
import cloudinary
import cloudinary.uploader
from api.cloudinary.cloudinary_config import *

# Importación circular segura: se resuelve porque routes/__init__.py
# ya terminó de crear `api` antes de llegar a esta línea
from api.routes import api


@api.route('/post', methods=['POST'])
@jwt_required()
def create_post():

    try:

        content = request.form.get('content')
        foro_id = request.form.get('foro_id')
        title = request.form.get('title')

        print("TITLE:", title)
        print("CONTENT:", content)
        print("FORO_ID:", foro_id)
        print("JWT IDENTITY:", get_jwt_identity())

        if not title:
            return jsonify({
                "msg": "Title is required"
            }), 400

        if not content:
            return jsonify({
                "msg": "Content is required"
            }), 400

        img_url = None

        if 'img' in request.files:
            file_to_upload = request.files['img']
            if file_to_upload.filename != '':
                try:
                    upload_result = cloudinary.uploader.upload(file_to_upload)
                    img_url = upload_result["secure_url"]
                except Exception as e:
                    return jsonify({"msg": str(e)}), 500

        new_post = Post(
            title=title,
            content=content,
            img=img_url,
            foro_id=int(foro_id) if foro_id else None,
            user_id=int(get_jwt_identity())
        )

        db.session.add(new_post)
        db.session.commit()

        return jsonify({
            "msg": "Post created",
            "post": new_post.serialize_post()
        }), 201

    except Exception as e:

        db.session.rollback()

        print("ERROR CREANDO POST:", str(e))

        return jsonify({
            "error": str(e)
        }), 500


@api.route('/post/<int:post_id>', methods=['GET'])
def get_post_id(post_id):

    post = Post.query.get(post_id)

    if post is None:
        return jsonify({
            "msg": "Post not found"
        }), 404

    return jsonify(
        post.serialize_post()
    ), 200


@api.route('/foro/<int:foro_id>/posts', methods=['GET'])
@jwt_required()
def get_posts_by_foro(foro_id):

    user_id = get_jwt_identity()
    
    posts = Post.query.filter_by(
        foro_id=foro_id
    ).order_by(
        Post.created_at.desc()
    ).all()

    post_serializes = []

    for post in posts:
        post_data = post.serialize_post()

        user_liked = False
        if user_id:
            for like in post.likedPost:
                if like.user_id == user_id:
                    user_liked = True
                    break
        post_data["likes_count"] = len(post.likedPost)
        post_data["like_by_user"] = user_liked 
        
        post_serializes.append(post_data)

    return jsonify(post_serializes), 200


@api.route('/foro/<int:foro_id>/posts/top', methods=['GET'])
def get_top_three_posts(foro_id):

    posts = Post.query.filter_by(
        foro_id=foro_id
    ).order_by(
        Post.created_at.desc()
    ).limit(3).all()

    return jsonify([
        post.serialize_post()
        for post in posts
    ]), 200


@api.route('/post/<int:post_id>', methods=['PUT'])
@jwt_required()
def edit_posts(post_id):

    post_update = db.session.get(Post, post_id)

    if post_update is None:
        return jsonify({"msg": "Post not found"}), 404

    user_token = int(get_jwt_identity())
    if user_token != post_update.user_id:
        return jsonify({"msg": "You do not have permission to update this post"}), 403
    
    if request.form.get('img') == 'delete':
        post_update.img = None

    if 'img' in request.files:
        file_to_upload = request.files['img']
        img_url = save_img(file_to_upload)
        if isinstance(img_url, str):
            post_update.img = img_url

    post_update.title = request.form.get('title', post_update.title)
    post_update.content = request.form.get('content', post_update.content)

    db.session.commit()
    return jsonify({"msg": "Post updated", "Post": post_update.serialize_post()}), 200


@api.route("post/like/<int:post_id>", methods=["POST", "DELETE"])
@jwt_required()
def handle_like_post (post_id):
    user_id = get_jwt_identity()
    post = Post.query.get(post_id)

    if not post:
        return jsonify({"msg": "Post no encontrado"}), 400
    if request.method == "POST":
        exist = LikePost.query.filter_by( user_id=user_id, post_id=post_id ).first()
        if exist:
            return jsonify({"msg": "Ya le diste like al post"}), 400
        new_like = LikePost(
            user_id=user_id,
            post_id=post_id
        )
    
        db.session.add(new_like)
        db.session.commit()
        return jsonify({"msg": "Like al post correctamente", "like": new_like.serialize_like_post()}), 201

    if request.method == "DELETE":
        like = LikePost.query.filter_by(user_id=user_id, post_id=post_id).first()
        if not like:
            return jsonify({"msg": "No has dado like a este post"}), 404
        
        db.session.delete(like)
        db.session.commit()
        return jsonify({"msg": "Like eliminado"}), 200

