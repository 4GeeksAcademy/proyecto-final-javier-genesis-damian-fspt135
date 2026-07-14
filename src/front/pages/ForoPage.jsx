import React from "react";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { PostCard } from "../components/Post/PostCard"
import { BodyTagSimply } from "../components/BodyTag.jsx";
import { useForoById } from "../hooks/Hooks_foro/useForo.js";
import { useFollowForo } from "../hooks/Hooks_foro/useFollowForo.js";
import logo from "../assets/img/logomin.png";
import { EditForoModal } from "../components/EditForoModal.jsx";
import { FaEdit } from "react-icons/fa";


export const ForoPage = () => {
    const { foro_id } = useParams();
    const {
        getForoForId,
        foro,
        loading
    } = useForoById(foro_id)

    const {
        handleFollowForo,
        isFollowed,
        followCount } = useFollowForo(foro);
    const [editingForo, setEditingForo] = useState(null);
    const user = JSON.parse(localStorage.getItem("user"));
    const [searchPost, setSearchPost] = useState("");


    if (loading) {
        return (
            <div className="text-center mt-5">
                <h3>Cargando...</h3>
            </div>
        );
    }

    if (!foro) {
        return (
            <div className="text-center mt-5">
                <h3>Foro no encontrado.</h3>
            </div>
        );
    }

    const filteredPosts = foro.posts?.filter((post) =>
        post.title.toLowerCase().includes(searchPost.toLowerCase())
    ) || [];

    return (
        <div className="container mt-4 pb-5" style={{ maxWidth: "800px" }}>
            <div className="row align-items-center g-3 mb-3 bg-white p-3 rounded border shadow-sm mx-0">
                <div className="col-12 col-md-3 d-flex justify-content-center justify-content-md-start">
                    <img
                        src={foro.img || logo}
                        alt="Foto del foro"
                        className="rounded-circle border border-secondary shadow-sm"
                        style={{ width: "70px", height: "70px", objectFit: "cover" }}
                    />
                </div>
                <div className="col-12 col-md-6 text-center">
                    <h1 className="h3 border rounded py-2 px-4 bg-light d-inline-block fw-bold text-uppercase m-0 w-100">
                        {foro.title}
                    </h1>
                </div>
                <div className="d-flex gap-2 w-100 w-md-auto justify-content-center justify-content-md-end mt-3 mt-md-0">
                    <button
                        className="btn btn-outline-secondary fw-medium px-3 shadow-sm d-flex align-items-center gap-1"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#infoForoCollapse"
                        aria-expanded="false"
                        aria-controls="infoForoCollapse"
                    >
                        info <span>▼</span>
                    </button>

                    <button className="btn btn-outline-danger fw-medium px-3 shadow-sm"
                        onClick={() => handleFollowForo(foro.id)}>
                        {isFollowed ? (
                            <>
                                <i className="fa-solid fa-heart"></i> Siguiendo
                            </>
                        ) : (
                            <>
                                <i className="fa-regular fa-heart"></i> Seguir
                            </>)}
                        <span className="ms-2">{followCount > 0 ? followCount : ""}</span>
                    </button>
                    {Number(foro.user_id) === Number(user?.id) && (
                        <button
                            className="btn btn-outline-secondary fw-medium px-3 shadow-sm"
                            onClick={() => setEditingForo(foro)}
                        >
                            <FaEdit />
                        </button>
                    )}
                </div>
            </div>
            <div className="collapse mb-3" id="infoForoCollapse" >
                <div className="card card-body bg-white border shadow-sm">
                    <h5 className="fw-bold text-secondary mb-2">Acerca de este foro:</h5>
                    <p className="text-muted small mb-3">{foro.description}</p>
                    <div className="d-flex flex-wrap gap-2 pt-2 border-top">
                        {foro.tags && foro.tags.length > 0 ? (
                            foro.tags.map((tag) => (
                                <BodyTagSimply key={tag.id} tag={tag} />
                            ))
                        ) : (
                            <span className="text-muted xtra-small">Sin etiquetas</span>
                        )}
                    </div>
                </div>
            </div>

            <div className="mb-4">
                <input
                    type="text"
                    className="form-control form-control-lg text-center border-2 shadow-sm rounded-pill"
                    placeholder="Buscar posts..."
                    value={searchPost}
                    onChange={(e) => setSearchPost(e.target.value)}
                />
            </div>
            <div className="p-4 border rounded-4 bg-white shadow-sm mb-4"
                style={{ maxHeight: "800px", overflowY: "auto" }}>
                {filteredPosts.length > 0 ? (
                    filteredPosts.map((post) => (
                        <Link className="text-decoration-none text-dark"
                            to={`/foro/${foro_id}/post/${post.id}`}>
                            <PostCard key={post.id} post={post} />
                        </Link>
                    ))) : (<span className="text-muted xtra-small">No se encontraron posts.</span>)}
            </div>
            <div className="d-flex justify-content-between align-items-center mt-4">
                <Link className="btn btn-outline-secondary px-4 py-2 fw-medium shadow-sm rounded-3"
                    to="/feed">
                    Back 
                </Link>
                <Link
                    to={`/foro/${foro_id}/create-post`}
                    className="btn btn-outline-primary px-4 py-2 fw-bold shadow-sm rounded-3">
                    Publicar
                </Link>
            </div>
            {editingForo && (
                <EditForoModal
                    foro={editingForo}
                    onSuccess={() => {
                        setEditingForo(null);
                        getForoForId();
                    }}
                    onClose={() => setEditingForo(null)}
                />
            )}
        </div>
    )

}