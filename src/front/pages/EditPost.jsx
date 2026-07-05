import React from "react";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { usePost } from "../hooks/Hooks_post/usePost";


export const EditPost = () => {
    const navigate = useNavigate();

    const {
        loading,
        title,
        setTitle,
        content,
        setContent,
        img,
        setImg,
        handleEditPost,
        initialPost } = usePost();

    const [preview, setPreview] = useState(initialPost?.img || null);

    return (
        <div className="container creacion-post-container">

            <div className="row justify-content-center w-100">

                <div className="col-md-8 col-lg-6">

                    <div className="card shadow creacion-post-card">

                        <div className="card-body p-4">

                            <h3 className="text-center fw-bold mb-4 creacion-post-title">
                                Editar Post
                            </h3>

                            <input
                                type="text"
                                className="form-control creacion-post-input mb-3"
                                placeholder="Título"
                                value={title}
                                onChange={(e) =>
                                    setTitle(e.target.value)
                                }
                            />

                            <input
                                id="post-image"
                                type="file"
                                className="form-control mb-3"
                                accept="image/*"
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    setImg(file);
                                    if (file) {
                                        setPreview(URL.createObjectURL(file));
                                    }
                                }}
                            />

                            {
                                preview && (
                                    <div className="text-center mb-3 position-relative d-inline-block w-100">
                                        <img
                                            src={preview}
                                            alt="preview"
                                            className="img-fluid rounded shadow preview-image"
                                        />
                                        <button
                                            type="button"
                                            className="btn btn-danger btn-sm position-absolute top-0 end-0 m-2"
                                            onClick={() => {
                                                setImg("delete");
                                                setPreview(null);
                                                const fileInput = document.getElementById("post-image");
                                                if (fileInput) fileInput.value = "";
                                            }}
                                            style={{
                                                width: "32px",
                                                height: "32px",
                                                padding: "0",
                                                zIndex: 10 /* Asegura que quede por encima de la imagen */
                                            }}
                                        >
                                            <i class="fa-regular fa-circle-xmark"></i>
                                        </button>
                                    </div>
                                )
                            }

                            <textarea
                                className="form-control creacion-post-textarea mb-4"
                                rows="5"
                                placeholder="Texto / Descripción"
                                value={content}
                                onChange={(e) =>
                                    setContent(e.target.value)
                                }
                            />

                            <div className="d-flex justify-content-center gap-3">

                                <button
                                    type="button"
                                    className="btn btn-outline-danger btn-cancelar"
                                    onClick={() => navigate(-1)}
                                >
                                    Cancelar
                                </button>
                                <button
                                    className="btn btn-primary btn-publicar"
                                    onClick={() => handleEditPost(initialPost?.id, navigate)}
                                >
                                    {loading ? "Guardando..." : "Guardar Cambios"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};