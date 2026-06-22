import { useFeed } from "../hooks/useFeed";
import "../../css/feed.css";
import { FaUserCircle } from "react-icons/fa";

export const CreateFeed = () => {

    const {
        loading,
        search,
        setSearch,
        myForos,
        allTags,
        activeTag,
        setActiveTag
    } = useFeed();

    if (loading) {
        return (
            <div className="text-center mt-5">
                <h3>Cargando...</h3>
            </div>
        );
    }

    return (
        <div className="feed-page">

            <aside className="feed-sidebar">

                <div className="profile-card">

                    <FaUserCircle className="profile-avatar" />

                    <h5 className="mt-3">
                        Mi Perfil
                    </h5>

                </div>

                <div className="sidebar-card">

                    <h5>Buscar Foro</h5>

                    <input
                        type="text"
                        className="form-control"
                        placeholder="Buscar foro..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                </div>

                <div className="sidebar-card">

                    <h5>Mis Foros</h5>

                    {
                        myForos.length > 0 ? (

                            <ul className="forum-list">

                                {
                                    myForos.map((foro) => (

                                        <li
                                            key={foro.id}
                                            className="forum-item"
                                        >

                                            <img
                                                src={foro.img}
                                                alt={foro.title}
                                                className="forum-image"
                                            />

                                            <span>
                                                {foro.title}
                                            </span>

                                        </li>

                                    ))
                                }

                            </ul>

                        ) : (

                            <p>No tienes foros creados.</p>

                        )
                    }

                </div>

                <div className="sidebar-card">

                    <h5>Filtrar por Tags</h5>

                    <button
                        className={`btn mb-2 me-2 ${activeTag === ""
                                ? "btn-primary"
                                : "btn-outline-primary"
                            }`}
                        onClick={() => setActiveTag("")}
                    >
                        Todos
                    </button>

                    {
                        allTags.length > 0 ? (

                            allTags.map((tag) => (

                                <button
                                    key={tag}
                                    className={`btn mb-2 me-2 ${activeTag === tag
                                            ? "btn-primary"
                                            : "btn-outline-primary"
                                        }`}
                                    onClick={() => setActiveTag(tag)}
                                >
                                    {tag}
                                </button>

                            ))

                        ) : (

                            <p className="text-muted">
                                No hay tags disponibles
                            </p>

                        )
                    }

                </div>

   

                <div className="sidebar-card">

                    <h5>Foros Recomendados</h5>

                    <div className="recommended-box">

                        Próximamente

                    </div>

                </div>

            </aside>
            <main className="feed-main">

                <div className="placeholder-feed">

                    <h4>Zona de Foros</h4>

                    <p>
                        Aquí se mostrarán los foros y publicaciones.
                    </p>

                </div>

            </main>

        </div>
    );
};