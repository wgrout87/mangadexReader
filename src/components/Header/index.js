import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSiteContext } from "../../utils/GlobalState";
import { UPDATE_PAGE } from "../../utils/actions";
import { useAuth } from "../../contexts/AuthContext";
import { Alert } from "react-bootstrap";

const Header = () => {
    const [error, setError] = useState('');
    const { currentUser, logout } = useAuth();

    const [state, dispatch] = useSiteContext();

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
                            <div>
                                <img alt="MangaDex" src="./assets/images/mangadex-wordmark.svg" className="wordmark filter-green" />
                                <h5 className="ms-auto me-0">Reader</h5>
                            </div>
                        </div>
                    </Link>

                    <nav className="navbar ms-auto">
                        <div className="dropdown hidden-arrow">
                            <button className="btn rounded-circle btnForm text-decoration-none p-1 m-1 text-light" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <img data-v-e065c6ac="" className="rounded-full overflow-hidden" src="./assets/images/avatar.png" alt="Avatar" width="1065" height="1065" id="avatar" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
                                {/* <svg data-v-58fcffdf="" data-v-e065c6ac="" xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="none" viewBox="0 0 24 24" class="icon large text-icon-contrast text-undefined" id="avatar"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2m8-10a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"></path></svg> */}
                            </button>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="/signup">Signup</a></li>
                                <li><a className="dropdown-item" href="/forgot-password">Forgot Password</a></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><a className="dropdown-item" href="/update-profile">Update Profile</a></li>
                            </ul>
                        </div>
                        <div className="container-fluid">
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
                        </div>
                    </nav>
                </div>
            </header>
            {error && <Alert variant='danger'>{error}</Alert>}
        </>
    )
}

export default Header;