import { Link } from "react-router-dom";
import logo from "../assets/img/logomin.png";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import "../../css/Navbar.css";
 
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
 
export const Navbar = () => {
 
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [results, setResults] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const containerRef = useRef(null);
 
    const user = JSON.parse(localStorage.getItem("user"));
 
    useEffect(() => {
        if (!search.trim()) {
            setResults([]);
            setShowDropdown(false);
            return;
        }
 
        const delay = setTimeout(async () => {
            try {
                const res = await fetch(`${BACKEND_URL}/api/foros/search?query=${search}`);
                const data = await res.json();
                setResults(data);
                setShowDropdown(true);
            } catch (error) {
                console.error("Error buscando foros:", error);
            }
        }, 300);
 
        return () => clearTimeout(delay);
    }, [search]);
 
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (containerRef.current && !containerRef.current.contains(e.target)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
 
    const handleSelect = (foroId) => {
        setSearch("");
        setShowDropdown(false);
        navigate(`/foro/${foroId}`);
    };
 
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/");
    };
 
    return (
 
        <nav className="navbar bg-white shadow-sm border-bottom">
 
            <div className="container-fluid navbar-content">
                <Link to="/feed" className="navbar-brand">
                    <img src={logo} alt="MindFed" className="mindfed-logo" />
                </Link>
 
                <div className="navbar-search-container" ref={containerRef}>
 
                    <input
                        type="text"
                        className="form-control navbar-search"
                        placeholder="Buscar foros..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onFocus={() => results.length > 0 && setShowDropdown(true)}
                    />
 
                    {showDropdown && (
                        <div className="navbar-search-dropdown">
                            {results.length === 0 ? (
                                <div className="navbar-search-empty">
                                    Sin resultados para "{search}"
                                </div>
                            ) : (
                                results.map((foro) => (
                                    <div
                                        key={foro.id}
                                        className="navbar-search-item"
                                        onClick={() => handleSelect(foro.id)}
                                    >
                                        <img
                                            src={foro.img || "https://placehold.co/40?text=F"}
                                            alt={foro.title}
                                            className="navbar-search-item-img"
                                        />
                                        <div>
                                            <p className="navbar-search-item-title">{foro.title}</p>
                                            <p className="navbar-search-item-desc">{foro.description}</p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    )}
 
                </div>
 
                <div className="dropdown">
 
                    <button
                        className="btn btn-light menu-btn"
                        type="button"
                        data-bs-toggle="dropdown"
                    >
                        ☰
                    </button>
 
                    <ul className="dropdown-menu dropdown-menu-end">
                        <li>
                            <Link className="dropdown-item" to="/create-foro">
                                Crear Foro
                            </Link>
                        </li>
                        <li>
                            <Link className="dropdown-item" to="/foros">
                                Foros
                            </Link>
                        </li>
                        <li>
                            <Link className="dropdown-item" to={`/profile/${user?.id}`}>
                                Perfil
                            </Link>
                        </li>
                        <li>
                            <hr className="dropdown-divider" />
                        </li>
                        <li>
                            <button className="dropdown-item text-danger" onClick={handleLogout}>
                                Cerrar Sesión
                            </button>
                        </li>
                    </ul>
 
                </div>
 
            </div>
 
        </nav>
 
    );
};