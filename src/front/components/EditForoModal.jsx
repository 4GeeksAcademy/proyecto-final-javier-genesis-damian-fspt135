import { useEffect, useRef } from "react";
import { useEditForo } from "../hooks/Hooks_foro/useEditForo";
 
export const EditForoModal = ({ foro, onSuccess, onClose }) => {
    const {
        title, setTitle,
        description, setDescription,
        img, setImg,
        loading,
        error,
        handleSubmit
    } = useEditForo(foro, (updatedForo) => {
        onSuccess(updatedForo);
        onClose();
    });
 
    const modalRef = useRef(null);
 
    useEffect(() => {
        const el = modalRef.current;
        if (!el) return;
        const bsModal = new window.bootstrap.Modal(el);
        bsModal.show();
        el.addEventListener("hidden.bs.modal", onClose);
        return () => {
            el.removeEventListener("hidden.bs.modal", onClose);
            bsModal.dispose();
        };
    }, []);
 
    const currentImg = img instanceof File ? URL.createObjectURL(img) : foro?.img;
 
    return (
        <div className="modal fade" ref={modalRef} tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content rounded-4 border-0 shadow">
 
                    <div className="modal-header border-0 pb-0">
                        <h5 className="modal-title fw-bold">Editar Foro</h5>
                        <button
                            type="button"
                            className="btn-close"
                            onClick={onClose}
                        />
                    </div>
 
                    <div className="modal-body pt-2">
 
                        {error && (
                            <div className="alert alert-danger py-2 text-center small">
                                <i className="bi bi-exclamation-triangle-fill me-2"></i>{error}
                            </div>
                        )}
 
                        <form onSubmit={handleSubmit}>
 
                            <div className="d-flex align-items-center gap-3 mb-4">
                                {currentImg ? (
                                    <img
                                        src={currentImg}
                                        alt="preview"
                                        className="rounded-circle shadow-sm object-fit-cover"
                                        style={{ width: "65px", height: "65px" }}
                                        onError={(e) => { e.target.src = "https://placehold.co/65?text=Foro"; }}
                                    />
                                ) : (
                                    <div
                                        className="bg-primary text-white d-flex align-items-center justify-content-center rounded-circle shadow-sm"
                                        style={{ width: "65px", height: "65px", fontSize: "1.8rem" }}
                                    >
                                        💬
                                    </div>
                                )}
                                <div className="flex-grow-1">
                                    <div className="card shadow-sm border-0 bg-white p-2 rounded-3">
                                        <input
                                            type="text"
                                            className="form-control border-0 text-center fw-bold text-uppercase h5 mb-0 py-1"
                                            placeholder="Título del foro..."
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            required
                                            style={{ outline: "none", boxShadow: "none" }}
                                        />
                                    </div>
                                </div>
                            </div>
 
                            <div className="mb-3">
                                <div className="card shadow-sm border-0 p-3 bg-white rounded-3">
                                    <div className="input-group">
                                        <span className="input-group-text bg-white border-light-subtle text-muted">
                                            <i className="bi bi-image"></i>
                                        </span>
                                        <input
                                            type="file"
                                            className="form-control border-light-subtle"
                                            accept="image/*"
                                            onChange={(e) => setImg(e.target.files[0])}
                                        />
                                    </div>
                                </div>
                            </div>
 
                            <div className="mb-4">
                                <div className="card shadow-sm border-0 p-3 bg-white rounded-4">
                                    <label className="form-label text-muted fw-bold small mb-2">
                                        <i className="bi bi-pencil-square me-2"></i>Descripción
                                    </label>
                                    <textarea
                                        className="form-control border-light-subtle rounded-3"
                                        placeholder="Descripción del foro..."
                                        style={{ minHeight: "120px", resize: "none" }}
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </div>
                            </div>
 
                            <div className="d-flex justify-content-end gap-2">
                                <button
                                    type="button"
                                    className="btn btn-outline-secondary rounded-pill px-4 fw-bold"
                                    onClick={onClose}
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="btn btn-primary rounded-pill px-4 fw-bold"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                            Guardando...
                                        </>
                                    ) : (
                                        <>Guardar cambios<i className="bi bi-check-lg ms-2"></i></>
                                    )}
                                </button>
                            </div>
 
                        </form>
                    </div>
 
                </div>
            </div>
        </div>
    );
};