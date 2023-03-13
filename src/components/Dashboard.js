import React, { useState, useEffect } from "react";
import { Card, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useSiteContext } from "../utils/GlobalState";

export default function Dashboard() {
    const [state, dispatch] = useSiteContext();
    const [error, setError] = useState('');
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();
    const baseUrl = state.baseUrl;

    useEffect(() => {
        if (!state.username) {
            navigate('/link-account');
        }
    }, [state, navigate])

    async function handleLogout() {
        setError('');

        try {
            await logout();
            navigate('/login')
        } catch {
            setError('Failed to log out')
        }
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Dashboard</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <strong>Email:</strong> {currentUser.email}
                    <Button className='w-100' onClick={() => navigate('/update-profile')}>Update Profile</Button>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                <Button variant='link' onClick={handleLogout}>Log Out</Button>
            </div>
            <Button variant='link' onClick={() => {
                (async () => {
                    const resp = await axios({
                        method: 'GET',
                        url: `${baseUrl}/user/follows/manga/feed?limit=100&translatedLanguage%5B%5D=en&contentRating%5B%5D=safe&contentRating%5B%5D=suggestive&includeFutureUpdates=1&order%5BcreatedAt%5D=desc&order%5BupdatedAt%5D=desc&order%5BpublishAt%5D=desc&order%5BreadableAt%5D=desc&order%5Bvolume%5D=desc&order%5Bchapter%5D=desc`,
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${state.sessionToken}`
                        },
                    });

                    console.log(resp.data);
                })()
            }}>Get Feed</Button>
        </>
    )
}