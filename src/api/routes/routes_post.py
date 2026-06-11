from flask import request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from api.routes.routes_user import api
from api.models.model_post import Post
from api.database.db import db
# import cloudinary
# import cloudinary.uploader

@api.route('/post', methods=['POST'])
@jwt_required()
def create_post():
    content = request.form.get('content')
    foro_id = request.form.get('foro_id')
    title = request.form.get('title')
    
    if not title:
        return jsonify({
            "msg": "Title is required"
        }), 400


    if not content:
        return jsonify({"msg": "Content is required"}), 400

    img_url = None

    # if 'img' in request.files:
    #     file_to_upload = request.files['img']
    #     if file_to_upload.filename != '':
    #         try:
    #             upload_result = cloudinary.uploader.upload(file_to_upload)
    #             img_url = upload_result.get('secure_url')
    #         except Exception as e:
    #             return jsonify({"msg": "Error uploading image to Cloudinary"}), 500
    if 'img' in request.files:
        img_url = "https://url-de-prueba-falsa.com/imagen.jpg"

    new_post = Post(
        content = content,
        title = title,
        img = img_url,
        foro_id = int(foro_id) if foro_id else None,
        user_id = get_jwt_identity()
    )

    db.session.add(new_post)
    db.session.commit()

    return jsonify({"msg": "Post created", "post": new_post.serialize_post()}), 200

@api.route('/post/<int:post_id>', methods=['GET'])
def get_post_id(post_id):
    post = Post.query.get(post_id)

    if post is None:
        return jsonify({"msg": "Post not found"}), 400
        
    return jsonify(post.serialize_post()), 200

@api.route('/foro/<int:foro_id>/posts', methods=['GET'])
def get_posts_by_foro(foro_id):
    posts = Post.query.filter_by(foro_id=foro_id).order_by(Post.created_at.desc()).all()
    
    result = []
    for post in posts:
        result.append(post.serialize_post())
        
    return jsonify(result), 200

@api.route('/foro/<int:foro_id>/posts/top', methods=['GET'])
def get_top_three_posts(foro_id):
    posts = Post.query.filter_by(foro_id=foro_id).order_by(Post.created_at.desc()).limit(3).all()
    
    result = []
    for post in posts:
        result.append(post.serialize_post())
        
    return jsonify(result), 200