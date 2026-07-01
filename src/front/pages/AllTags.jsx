import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTag } from "../hooks/useTag";
import { BodyTag } from "../components/BodyTag.jsx";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const AllTags = () => {

    const { store, dispatch } = useGlobalReducer()
    const [loading, setLoading] = useState(false);

    const { chargeTagsToUserSelect, onSelectedTag, handleSave, selectedTag } = useTag();

    useEffect(() => {
        chargeTagsToUserSelect();
    }, []);

    const savetags = async (e) => {
        e.preventDefault()
        setLoading(true);
        try {
            const resTag = await handleSave();
        } catch (err) {
            console.error("Error to save tags", err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="container py-4 mx-auto">
            <div className="text-center mb-4">
                <h2 className="text-dark mb-1">Personaliza tu perfil</h2>
                <p className="text-muted">Selecciona los temas que más te interesan</p>
            </div>
            <div className="card shadow-sm border-0 bg-white p-4 mb-4">
                <label className="form-label fw-bold text-secondary mb-3 d-flex align-items-center gap-2"><i className="fa-solid fa-heart"></i> Selecciona tus gustos</label>
                <div className="d-flex flex-wrap gap-2 p-3 rounded border border-light-subtle bg-light overflow-y-auto align-items-start align-content-start" 
                style={{ 
                        maxHeight: "450px", 
                        minHeight: "250px", 
                        boxShadow: "inset 0 2px 4px rgba(0,0,0,0.03)" 
                    }}
                >
                    {store.tags && store.tags.length > 0 ? (
                        store.tags.map((tag) => {
                            const handleSelected = selectedTag.includes(tag.id);
                            return (
                                <BodyTag 
                                    key={tag.id} 
                                    tag={tag} 
                                    onSelectedTag={onSelectedTag} 
                                    isSelected={handleSelected} 
                                />
                            );
                        })
                    ) : (
                        <div className="w-100 text-center py-5 text-muted">
                            <p className="mb-0">Cargando intereses...</p>
                        </div>
                    )}
                </div>
            </div>
            <div className="d-flex justify-content-start align-items-center gap-3 mt-3">
                <Link
                    to="/feed"
                    className="btn btn-light border px-4 py-2 text-secondary hover-shadow-sm"
                >
                    Back
                </Link>
                <button
                    type="submit"
                    className={`btn ${loading ? "btn-secondary" : "btn-primary"} px-4 py-2 fw-bold shadow-sm`}
                    disabled={loading}
                    onClick={savetags}
                >
                    {loading ? "Guardando..." : "Guardar tags"}
                </button>
            </div>
        </div>
    )
}