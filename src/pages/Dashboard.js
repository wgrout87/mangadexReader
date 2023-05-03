import React, { useEffect, useState, useRef } from "react";
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useSiteContext } from "../utils/GlobalState";
import { UPDATE_HISTORY, UPDATE_EVERYTHING } from "../utils/actions";
import { sessionIsExpired } from "../utils/helpers";
import Subheader from "../components/Header/Subheader";
import History from "../components/Feeds/History";

export default function Dashboard() {
    const [state, dispatch] = useSiteContext();
    const [refreshingSession, setRefreshingSession] = useState(false);
    const [sessionRefreshed, setSessionRefreshed] = useState(false);
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const baseUrl = state.baseUrl;
    const mangaRef = useRef();

    const username = state.username ?? window.localStorage.getItem('username');
    const password = state.password ?? window.localStorage.getItem('password');
    let sessionToken = state.sessionToken ?? window.localStorage.getItem('sessionToken');
    let expires = state.expires ?? window.localStorage.getItem('expires');
    let refreshToken = state.refreshToken ?? window.localStorage.getItem('refreshToken');

    let getFeed = (async () => {
        console.log("Session Refresh Status: ", sessionRefreshed);
        const resp = await axios({
            method: 'GET',
            url: `${baseUrl}/user/follows/manga/feed?limit=20&translatedLanguage%5B%5D=en&contentRating%5B%5D=safe&contentRating%5B%5D=suggestive&includeFutureUpdates=1&order%5BcreatedAt%5D=desc&order%5BupdatedAt%5D=desc&order%5BpublishAt%5D=desc&order%5BreadableAt%5D=desc&order%5Bvolume%5D=desc&order%5Bchapter%5D=desc&`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${state.sessionToken}`
            },
        });

        mangaRef.current = resp.data.data;
        dispatch({
            type: UPDATE_HISTORY,
            history: mangaRef.current
        });

        // console.log("mangaRef: ", mangaRef)

        return resp.data.data;
    });

    let refreshSessionCall = async () => {
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
        setSessionRefreshed(true);
        return resp;
    };

    let refreshSession = () => {
        refreshSessionCall().then(resp => {
            // console.log("Session Refreshed");
            sessionToken = resp.data.token.session;
            expires = new Date().valueOf() + 15 * 60000;
            dispatch({
                type: UPDATE_EVERYTHING,
                username: username,
                password: password,
                sessionToken: sessionToken,
                expires: expires,
                refreshToken: refreshToken,
            });

            console.log(sessionToken);
        })
    }

    // Refresh the session on page load
    useEffect(() => {
        if (sessionIsExpired(expires) || !state.sessionToken) {
            refreshSession();
        };
        if (!username && !password) {
            navigate('/link-account');
        }
    }, []);

    // Get the feed if the session is refreshed
    useEffect(() => {
        console.log("Getting feed?");
        if (sessionRefreshed) {
            getFeed();
        } else {
            refreshSession();
        }
    }, [sessionRefreshed]);

    return (
        <>
            <Subheader subheader="Dashboard" />
            <History />
        </>
    )
}