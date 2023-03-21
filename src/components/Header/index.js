import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSiteContext } from "../../utils/GlobalState";
import { useAuth } from "../../contexts/AuthContext";
import { Alert } from "react-bootstrap";

const Header = () => {
    const [error, setError] = useState('');
    const { currentUser, logout } = useAuth();

    const [state] = useSiteContext();

    async function handleLogout() {
        setError('');

        try {
            await logout();
        } catch {
            setError('Failed to sign out')
        }
    }

    return (
        <>
            <header id="top">
                <div className="bg-dark text-light d-flex flex-row">
                    <div className="d-flex flex-row flex-wrap justify-content-between w-100">
                        <Link className="navbar-brand text-decoration-none" to="/">
                            <div className="d-flex align-items-center">
                                <img alt="MangaDex logo" src="./assets/images/mangadex-logo.svg" className="img-fluid" />
                                <div>
                                    <img alt="MangaDex" src="./assets/images/mangadex-wordmark.svg" className="wordmark filter-green" />
                                    <h4 className="ms-auto me-0">Reader</h4>
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
                                        <ul className="dropdown-menu dropdown-menu-end bg-less-dark text-light border-light">
                                            <h5 className="text-center">{state.username ?? "No Linked Account"}</h5>
                                            <li><hr className="dropdown-divider border-light" /></li>
                                            <li>
                                                <Link className="dropdown-item text-light" to="/">Dashboard</Link>
                                            </li>
                                            <li>
                                                <Link className="dropdown-item text-light" to="/update-profile">Update Profile</Link>
                                            </li>
                                            <li><hr className="dropdown-divider border-light" /></li>
                                            <li><Link className={`dropdown-item text-light`} to="/" onClick={handleLogout}>
                                                <svg data-v-58fcffdf="" data-v-23b03fcb="" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" className="icon text-icon-contrast text-undefined mr-2"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4m7 14 5-5-5-5m5 5H9"></path></svg>
                                                Sign Out
                                            </Link></li>
                                        </ul>
                                        :
                                        <ul className="dropdown-menu dropdown-menu-end bg-less-dark text-light">
                                            <li><Link className="dropdown-item text-light" to="/signin">Sign In</Link></li>
                                            <li><Link className="dropdown-item text-light" to="/signup">Sign Up</Link></li>
                                            <li><hr className="dropdown-divider border-light" /></li>
                                            <li><Link className="dropdown-item text-light" to="/forgot-password">Forgot Password</Link></li>
                                        </ul>
                                }
                            </div>
                        </nav>
                    </div>
                </div>
                <div className="w-100 bg-less-dark d-flex flex-row">
                    <h5 className="text-light ms-5 mt-1">{state.page}</h5>
                </div>
            </header>
            {error && <Alert variant='danger'>{error}</Alert>}
        </>
    )
}

export default Header;