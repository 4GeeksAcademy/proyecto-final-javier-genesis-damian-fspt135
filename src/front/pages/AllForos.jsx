import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { CardForoSimply } from "../components/CardForo.jsx";
import { useForo } from "../hooks/Hooks_foro/useForo.js";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useState } from "react";
import { EditForoModal } from "../components/EditForoModal.jsx";

export const AllForos = () => {
    const { store, dispatch } = useGlobalReducer()

    const { getDataForo } = useForo();

    useEffect(() => {
        console.log("estoy en los foros");

        getDataForo();
    }, []);

    const [editingForo, setEditingForo] = useState(null);
    const user = JSON.parse(localStorage.getItem("user"));

    return (
        <div className="container py-4">

            <div className="d-flex flex-wrap gap-2 border p-3 rounded bg-light overflow-y-auto">
                {store.foros && store.foros.map((foro) => {
                    return (
                        <div className="card shadow-sm border rounded-3 overflow-hidden bg-white">
                            <div>
                                <div>
                                    <CardForoSimply key={foro.id} foro={foro} img={foro?.img} title={foro?.title} description={foro?.description} />
                                </div>
                                <div className="text-center mt-3">
                                    <button className="btn btn-primary w-40 fw-bold shadow-sm py-2 m-2">
                                        Entrar
                                    </button>
                                    {Number(foro.user_id) === Number(user?.id) && (
                                        <button
                                            className="btn btn-outline-secondary fw-bold shadow-sm py-2 m-2"
                                            onClick={() => setEditingForo(foro)}
                                        >
                                            Edit Foro
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>)
                })}
            </div>

            <div className="mb-4">
                <Link
                    to="/feed"
                    className="btn btn-outline-secondary px-4 fw-bold mt-3"
                >
                    Back
                </Link>
            </div>
            {editingForo && (
                <EditForoModal
                    foro={editingForo}
                    onSuccess={(f) => console.log("Foro actualizado:", f)}
                    onClose={() => setEditingForo(null)}
                />
            )}
        </div>
    )
}