import { useState, useEffect, useRef } from "react";
import { useFeed } from "../hooks/useFeed";
import "../../css/feed.css";
import { FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { followForo } from "../../services/followService";
import userImg from "../../front/assets/img/userImg.png";


export const Feed = () => {

    const user = JSON.parse(localStorage.getItem("user"));

    const navigate = useNavigate();

    const carouselRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const handleFollow = async (foroId) => {
        try {
            const data = await followForo(foroId);
            console.log("FOLLOW:", data);

            await loadFollowForos();

            console.log("Lista de foros seguidos actualizada");

        } catch (error) {
            console.log(error);
        }
    };

    const {
        loading,
        posts,
        myForos,
        followForos,
        userTags,
        filteredForos,
        loadFollowForos,
        allTags,
        activeTag,
        setActiveTag
    } = useFeed();

    console.log("FOROS SEGUIDOS:", followForos);

    useEffect(() => {
        const carouselEl = carouselRef.current;
        if (!carouselEl) return;

        const handleSlide = (event) => {
            setActiveIndex(event.to);
        };

        carouselEl.addEventListener("slid.bs.carousel", handleSlide);

        return () => {
            carouselEl.removeEventListener("slid.bs.carousel", handleSlide);
        };
    }, [posts]);

    if (loading) {
        return (
            <div className="text-center mt-5 text-seccess">
                <h3>Cargando...</h3>
            </div>
        );
    }

    return (
        <div className="feed-page">

            <aside className="feed-sidebar">

                <Link
                    to={`/profile/${user?.id}`}
                    className="profile-card text-decoration-none"
                >

                    <img
                        src={user?.img || userImg}
                        alt={user?.first_name}
                        className="profile-avatar"
                    />

                    <h5 className="mt-3 text-danger mb-1">
                        {user?.first_name} {user?.last_name}
                    </h5>

                    <p className="text-secondary small m-0">
                        @{user?.username}
                    </p>

                </Link>


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
                                            onClick={() => navigate(`/foro/${foro.id}`)}

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

                    <h5>Foros Seguidos</h5>

                    {
                        followForos.length > 0 ? (

                            <ul className="forum-list">

                                {followForos.map((foro) => (

                                    <li
                                        key={foro.id}
                                        className="forum-item"
                                        onClick={() => navigate(`/foro/${foro.id}`)}
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

                                ))}

                            </ul>

                        ) : (

                            <p className="text-muted">
                                No sigues ningún foro actualmente.
                            </p>

                        )
                    }

                </div>

                <div className="sidebar-card">

                    <h5>Tags</h5>

                    {
                        userTags.length > 0 ? (

                            <div className="feed-tags">

                                {
                                    userTags.map((tagSelect) => (

                                        <span
                                            key={tagSelect.id}
                                            className="feed-tag"
                                        >
                                            {tagSelect.tag.title}
                                        </span>

                                    ))
                                }

                            </div>

                        ) : (

                            <p className="text-muted">
                                No has seleccionado tags todavía.
                            </p>

                        )
                    }

                </div>

            </aside>

            <main className="feed-main">

                <div
                    id="foroCarousel"
                    className="carousel slide mb-4"
                    ref={carouselRef}
                >
                    <div className="carousel-inner">

                        {[...posts]
                            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                            .slice(0, 3)
                            .map((post, index) => ((


                                <div
                                    key={post.id}
                                    className={`carousel-item ${index === 0 ? "active" : ""}`}
                                    onClick={() => navigate(`/foro/${post.foro_id}`)}
                                    style={{ cursor: "pointer" }}
                                >

                                    {post.img ? (

                                        <img
                                            src={post.img}
                                            alt={post.title}
                                            className="carousel-foro-image"
                                        />

                                    ) : (

                                        <div className="no-image d-flex justify-content-center align-items-center h-100">

                                            <h2 className="text-white fw-bold">
                                                {post.title}
                                            </h2>

                                        </div>

                                    )}


                                    <div className="carousel-caption">

                                        <h3>{post.title}</h3>

                                        <p>{post.content}</p>

                                        <div className="carousel-footer">

                                            <div className="carousel-user">

                                                <FaUserCircle size={22} />

                                                <span>
                                                    {post.user?.username || "Usuario"}
                                                </span>

                                            </div>

                                            <div className="carousel-stats">

                                                <span>
                                                    💬 {post.comments_count ?? 0}
                                                </span>

                                                <span>
                                                    ❤️ {post.likes_count ?? 0}
                                                </span>

                                            </div>

                                        </div>

                                    </div>

                                </div>

                            )))}

                </div>

                <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#foroCarousel"
                    data-bs-slide="prev"
                >
                    <span className="carousel-control-prev-icon"></span>
                </button>

                <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#foroCarousel"
                    data-bs-slide="next"
                >
                    <span className="carousel-control-next-icon"></span>
                </button>

        </div>

                {
        filteredForos.length > 0 ? (

            <>

                <div className="feed-section-header">

                    <h3> Foros sugeridos</h3>

                </div>

                <div className="foro-scroll sugeridos-scroll">

                    {filteredForos.map((foro) => (

                        <div
                            key={foro.id}
                            className="feed-foro-card-small"
                        >

                            <Link to={`/foro/${foro.id}`}>

                                <img
                                    src={foro.img}
                                    alt={foro.title}
                                    className="foro-card-small-image"
                                />

                            </Link>
                            <div className="p-3">

                                <h5>{foro.title}</h5>

                                <p>{foro.description}</p>

                                <div className="foro-card-buttons">

                                    <button
                                        className="btn-enter"
                                        onClick={() => navigate(`/foro/${foro.id}`)}
                                    >
                                        Entrar
                                    </button>

                                    <button
                                        className="btn-follow"
                                        onClick={() => handleFollow(foro.id)}
                                    >
                                        Seguir
                                    </button>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>

                <div className="feed-section-header">

                    <h3> Foros recientes</h3>

                </div>

                <div className="foro-scroll recientes-scroll">

                    {[...filteredForos]
                        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                        .map((foro) => (

                            <div
                                key={`recent-${foro.id}`}
                                className="feed-foro-card-small"
                            >

                                <img
                                    src={foro.img}
                                    alt={foro.title}
                                    className="foro-card-small-image"
                                />

                                <div className="p-3">

                                    <h5>{foro.title}</h5>

                                    <p>{foro.description}</p>

                                    <div className="foro-card-buttons">

                                        <button
                                            className="btn-enter"
                                            onClick={() => navigate(`/foro/${foro.id}`)}
                                        >
                                            Entrar
                                        </button>

                                        <button
                                            className="btn-follow"
                                            onClick={() => handleFollow(foro.id)}
                                        >
                                            Seguir
                                        </button>

                                    </div>

                                </div>

                            </div>

                        ))}

                </div>


            </>

        ) : (

            <div className="empty-search-card">


                <h3>
                    🔍 No encontramos resultados
                </h3>

                <p>
                    No existe ningún foro que coincida con tu búsqueda.
                </p>

            </div>

        )
    }

            </main >


        </div >
    );
};