import React, { useEffect, useState, useRef } from "react";
import { Card, Button } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useSiteContext } from "../utils/GlobalState";
import { UPDATE_HISTORY, UPDATE_EVERYTHING } from "../utils/actions";
import { sessionIsExpired } from "../utils/helpers";
import Subheader from "./Header/Subheader";
import MangaCard from "./MangaCard";

export default function Dashboard() {
    const [state, dispatch] = useSiteContext();
    const [refreshingSession, setRefreshingSession] = useState(false);
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const baseUrl = state.baseUrl;
    const idRef = useRef();

    useEffect(() => {
        console.log(state.sessionToken)
    }, [state.sessionToken]);

    let getFeed = (async () => {
        const resp = await axios({
            method: 'GET',
            url: `${baseUrl}/user/follows/manga/feed?limit=20&translatedLanguage%5B%5D=en&contentRating%5B%5D=safe&contentRating%5B%5D=suggestive&includeFutureUpdates=1&order%5BcreatedAt%5D=desc&order%5BupdatedAt%5D=desc&order%5BpublishAt%5D=desc&order%5BreadableAt%5D=desc&order%5Bvolume%5D=desc&order%5Bchapter%5D=desc`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${state.sessionToken}`
            },
        });

        idRef.current = resp.data.data[0].id; dispatch({
            type: UPDATE_HISTORY,
            history: idRef
        });

        console.log(state.history);

        return resp.data.data;
    });

    useEffect(() => {
        const username = state.username ?? window.localStorage.getItem('username');
        const password = state.password ?? window.localStorage.getItem('password');
        let sessionToken = state.sessionToken ?? window.localStorage.getItem('sessionToken');
        let expires = state.expires ?? window.localStorage.getItem('expires');
        let refreshToken = state.refreshToken ?? window.localStorage.getItem('refreshToken');
        if (sessionIsExpired(expires)) {
            (console.log("Session Refreshed"));
            let refreshSession = async () => {
                setRefreshingSession(true);
                const resp = await axios({
                    method: 'POST',
                    url: `${baseUrl}/auth/refresh`,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: {
                        token: refreshToken
                    }
                });

                setRefreshingSession(false);
                return resp;
            };

            refreshSession().then(resp => {
                console.log("Session Refreshed");
                sessionToken = resp.data.token.session;
                expires = new Date().valueOf() + 15 * 60000
                dispatch({
                    type: UPDATE_EVERYTHING,
                    username: username,
                    password: password,
                    sessionToken: sessionToken,
                    expires: expires,
                    refreshToken: refreshToken,
                });
            })
        };
        if (!username && !password) {
            navigate('/link-account');
        }
    }, [])

    return (
        <>
            <Subheader subheader="Dashboard" />
            <Card className="bg-dark">
                <Card.Body>
                    <h2 className="text-center mb-4">Dashboard</h2>
                    <strong>Email:</strong> {currentUser.email}
                </Card.Body>
            </Card>
            <Button disabled={refreshingSession} onClick={() => {
                getFeed().then(resp => console.log(resp));
            }}>
                {refreshingSession ? <span className="spinner-border spinner-border-sm"></span> : <span>Get Feed</span>}
            </Button>
            {/* {state.history && <MangaCard id={state.history} />} */}
        </>
    )
}