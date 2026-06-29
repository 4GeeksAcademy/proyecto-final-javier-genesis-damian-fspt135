import "../../css/profile.css";
import { FaEdit } from "react-icons/fa";
import { useProfileView } from "../hooks/useProfileView";

export const Profile = () => {

    const {
        profile,
        followForos,
        userTags,
        loading
    } = useProfileView();

    if (loading) {
        return (
            <div className="text-center mt-5">
                <h3>Cargando perfil...</h3>
            </div>
        );
    }

    return (

        <div className="profile-page">

            {/* IZQUIERDA */}

            <div className="profile-left">

                <div className="profile-avatar-card">

                    <img
                        src={profile?.img}
                        alt={profile?.first_name}
                        className="profile-avatar"
                    />

                    <button className="edit-btn">
                        <FaEdit />
                    </button>

                    <h3 className="mt-3">
                        {profile?.first_name} {profile?.last_name}
                    </h3>

                </div>

                <div className="profile-follow-card">

                    <div className="card-header-profile">
                        <h4>Foros Seguidos</h4>

                        <button className="edit-btn-small">
                            <FaEdit />
                        </button>
                    </div>

                    <div className="follow-list">

                        {
                            followForos.length > 0 ? (

                                followForos.map((foro) => (

                                    <div
                                        key={foro.id}
                                        className="follow-item"
                                    >

                                        <img
                                            src={foro.img}
                                            alt={foro.title}
                                            className="follow-image"
                                        />

                                        <span className="follow-title">
                                            {foro.title}
                                        </span>

                                    </div>

                                ))

                            ) : (

                                <p className="text-muted">
                                    No sigues ningún foro todavía.
                                </p>

                            )
                        }

                    </div>
                </div>

            </div>

            {/* DERECHA */}

            <div className="profile-right">

                <div className="profile-data-card">

                    <div className="card-header-profile">

                        <h3>Información del usuario</h3>

                        <button className="edit-btn-small">
                            <FaEdit />
                        </button>

                    </div>

                    <div className="profile-info">

                        <div className="info-item">
                            <span>Nombre</span>
                            <p>{profile?.first_name}</p>
                        </div>

                        <div className="info-item">
                            <span>Apellido</span>
                            <p>{profile?.last_name}</p>
                        </div>

                        <div className="info-item">
                            <span>Usuario</span>
                            <p>@{profile?.username}</p>
                        </div>

                        <div className="info-item">
                            <span>Email</span>
                            <p>{profile?.email}</p>
                        </div>

                        <div className="info-item">
                            <span>Fecha de nacimiento</span>
                            <p>{profile?.date_birth || "No especificada"}</p>
                        </div>

                        <div className="info-item">
                            <span>Descripción</span>
                            <p>
                                {profile?.description || "Sin descripción"}
                            </p>
                        </div>

                    </div>

                </div>

                <div className="profile-tags-card">

                    <div className="card-header-profile">

                        <h3>Tags de gustos</h3>

                        <button className="edit-btn-small">
                            <FaEdit />
                        </button>

                    </div>

                    <div className="tag-container">

                        <div className="tag-container">

                            {
                                userTags.length > 0 ? (

                                    userTags.map((tagSelect) => (

                                        <div
                                            key={tagSelect.id}
                                            className="tag-item"
                                        >
                                            {tagSelect.tag.title}
                                        </div>

                                    ))

                                ) : (

                                    <p className="text-muted">
                                        No hay gustos seleccionados.
                                    </p>

                                )
                            }

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );
};