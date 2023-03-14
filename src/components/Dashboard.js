import React, { useEffect } from "react";
import { Card, Button } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from "react-router-dom";
import { UPDATE_PAGE } from "../utils/actions";
import axios from 'axios';
import { useSiteContext } from "../utils/GlobalState";

export default function Dashboard() {
    const [state, dispatch] = useSiteContext();
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const baseUrl = state.baseUrl;

    useEffect(() => {
        if (!state.username && state.page === "Dashboard") {
            navigate('/link-account');
            dispatch({
                type: UPDATE_PAGE,
                page: "Link Account"
            })
        }
    }, [state, navigate, dispatch])

    return (
        <>
            <Card className="bg-dark">
                <Card.Body>
                    <h2 className="text-center mb-4">Dashboard</h2>
                    <strong>Email:</strong> {currentUser.email}
                </Card.Body>
            </Card>
            <Button onClick={() => {
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