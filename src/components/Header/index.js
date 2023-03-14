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

    async function handleLogout() {
        setError('');

        try {
            await logout();
        } catch {
            setError('Failed to sign out')
        }
    }

    useEffect(() => { console.log(state.page) }, [state]);

    return (
        <>
            <header className="bg-dark text-light d-flex flex-row" id="top">
                <div className="d-flex flex-row flex-wrap justify-content-between w-100">
                    <Link className="navbar-brand text-decoration-none" to="/" onClick={() => {
                        dispatch({
                            type: UPDATE_PAGE,
                            page: "Dashboard"
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
                                {
                                    currentUser ?
                                        <img className="rounded-full overflow-hidden" src="./assets/images/avatar.png" alt="Avatar" width="1065" height="1065" id="avatar" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
                                        :
                                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="none" viewBox="0 0 24 24" className="icon large text-icon-contrast text-undefined" id="avatar"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2m8-10a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"></path></svg>
                                }
                            </button>
                            {
                                currentUser ?
                                    <ul className="dropdown-menu dropdown-menu-end">
                                        <h5 className="text-center">{state.username ?? "No Linked Account"}</h5>
                                        <li><hr className="dropdown-divider" /></li>
                                        <li>
                                            <Link className="dropdown-item" to="/" onClick={() => {
                                                dispatch({
                                                    type: UPDATE_PAGE,
                                                    page: "Dashboard"
                                                })
                                            }
                                            }>Dashboard</Link>
                                        </li>
                                        <li>
                                            <Link className="dropdown-item" to="/update-profile" onClick={() => {
                                                dispatch({
                                                    type: UPDATE_PAGE,
                                                    page: "Update Profile"
                                                })
                                            }
                                            }>Update Profile</Link>
                                        </li>
                                        <li><hr className="dropdown-divider" /></li>
                                        <li><Link className={`dropdown-item`} to="/" onClick={() => {
                                            dispatch({
                                                type: UPDATE_PAGE,
                                                page: "Sign In"
                                            })
                                            handleLogout()
                                        }}>
                                            <svg data-v-58fcffdf="" data-v-23b03fcb="" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" className="icon text-icon-contrast text-undefined mr-2"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4m7 14 5-5-5-5m5 5H9"></path></svg>
                                            Sign Out
                                        </Link></li>
                                    </ul>
                                    :
                                    <ul className="dropdown-menu dropdown-menu-end">
                                        <li><Link className="dropdown-item" to="/signin" onClick={() => {
                                            dispatch({
                                                type: UPDATE_PAGE,
                                                page: "Sign In"
                                            })
                                        }
                                        }>Sign In</Link></li>
                                        <li><Link className="dropdown-item" to="/signup" onClick={() => {
                                            dispatch({
                                                type: UPDATE_PAGE,
                                                page: "Sign Up"
                                            })
                                        }
                                        }>Sign Up</Link></li>
                                        <li><hr className="dropdown-divider" /></li>
                                        <li><Link className="dropdown-item" to="/forgot-password" onClick={() => {
                                            dispatch({
                                                type: UPDATE_PAGE,
                                                page: "Password Recovery"
                                            })
                                        }
                                        }>Forgot Password</Link></li>
                                    </ul>
                            }
                        </div>
                    </nav>
                </div>
            </header>
            {error && <Alert variant='danger'>{error}</Alert>}
        </>
    )
}

export default Header;