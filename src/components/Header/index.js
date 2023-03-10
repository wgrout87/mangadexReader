import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSiteContext } from "../../utils/GlobalState";
import { UPDATE_PAGE } from "../../utils/actions";
import { useAuth } from "../../contexts/AuthContext";
import { Alert } from "react-bootstrap";

const Header = () => {
    const [error, setError] = useState('');
    const { currentUser, logout } = useAuth();

    const [state, dispatch] = useSiteContext();
    useEffect(() => {
        dispatch({
            type: UPDATE_PAGE,
            page: window.location.pathname
        });
    });

    async function handleLogout() {
        setError('');

        try {
            await logout();
        } catch {
            setError('Failed to log out')
        }
    }

    return (
        <>
            <header className="bg-dark text-light d-flex flex-row" id="top">
                <div className="d-flex flex-row flex-wrap justify-content-between w-100">
                    <Link className="navbar-brand text-decoration-none" to="/" onClick={() => {
                        dispatch({
                            type: UPDATE_PAGE,
                            page: "/"
                        })
                    }
                    }>
                        <div className="d-flex align-items-center">
                            <img alt="MangaDex logo" src="./assets/images/mangadex-logo.svg" className="img-fluid" />
                            <div className="">
                                <img alt="MangaDex" src="./assets/images/mangadex-wordmark.svg" className="wordmark filter-green" />
                                <h5>Reader</h5>
                            </div>
                        </div>
                    </Link>

                    <nav className="navbar navbar-expand-md">
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle='collapse'
                            data-bs-target='#toggleMobileMenu'
                            aria-controls="toggleMobileMenu"
                            aria-expanded='false'
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon navbar-dark"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="toggleMobileMenu">
                            <ul className="navbar-nav text-center">
                                {currentUser ?
                                    <li>
                                        <Link className={`nav-link btn btnForm rounded text-decoration-none px-4 m-1 text-light ${state.page === "/" ? "bg-light text-dark" : ""}`} to="/" onClick={() => {
                                            dispatch({
                                                type: UPDATE_PAGE,
                                                page: "/"
                                            })
                                        }
                                        }>DASHBOARD</Link>
                                    </li>
                                    :
                                    <li>
                                        <Link className={`nav-link btn btnForm rounded text-decoration-none px-4 m-1 text-light ${state.page === "/login" ? "bg-light text-dark" : ""}`} to="/login" onClick={() => {
                                            dispatch({
                                                type: UPDATE_PAGE,
                                                page: "/login"
                                            })
                                        }
                                        }>LOG IN</Link>
                                    </li>}
                                {currentUser ?
                                    <li>
                                        <Link className={`nav-link btn btnForm rounded text-decoration-none px-4 m-1 text-light`} to="/" onClick={handleLogout}>LOG OUT</Link>
                                    </li>
                                    :
                                    <li>
                                        <Link className={`nav-link btn btnForm rounded text-decoration-none px-4 m-1 text-light ${state.page === "/signup" ? "bg-light text-dark" : ""}`} to="/signup" onClick={() => {
                                            dispatch({
                                                type: UPDATE_PAGE,
                                                page: "/signup"
                                            })
                                        }
                                        }>SIGN UP</Link>
                                    </li>}
                            </ul>
                        </div>
                    </nav>
                </div>
            </header>
            {error && <Alert variant='danger'>{error}</Alert>}
        </>
    )
}

export default Header;