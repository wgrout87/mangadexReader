import React, { useEffect, useState, useRef } from "react";
import { Card, Button } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useSiteContext } from "../utils/GlobalState";
import { UPDATE_EVERYTHING } from "../utils/actions";
import { sessionIsExpired } from "../utils/helpers";
import Subheader from "./Header/Subheader";
import { MangaCardCover, MangaCardLoading } from "./MangaCard";

export default function IndividualManga() {
    const [state, dispatch] = useSiteContext();
    const [mangaFetched, setMangaFetched] = useState(false);
    const [refreshingSession, setRefreshingSession] = useState(false);
    const [sessionRefreshed, setSessionRefreshed] = useState(false);
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const baseUrl = state.baseUrl;
    const titleRef = useRef();

    const mangaId = (window.location.search.replace(/^./, ""));

    let getManga = async () => {
        const resp = await axios({
            method: 'GET',
            url: `${baseUrl}/manga/${mangaId}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${state.sessionToken}`
            },
        });

        titleRef.current = (resp.data.data.attributes.altTitles.find(element => element.en).en);
        console.log(resp.data.data);

        setMangaFetched(true);

        return resp;
    }

    useEffect(() => {
        getManga();
    });

    useEffect(() => {
        const username = state.username ?? window.localStorage.getItem('username');
        const password = state.password ?? window.localStorage.getItem('password');
        let sessionToken = state.sessionToken ?? window.localStorage.getItem('sessionToken');
        let expires = state.expires ?? window.localStorage.getItem('expires');
        let refreshToken = state.refreshToken ?? window.localStorage.getItem('refreshToken');
        if (sessionIsExpired(expires) || !state.sessionToken) {
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
                setSessionRefreshed(true);
                return resp;
            };

            refreshSession().then(resp => {
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
            })
        };
        if (!username && !password) {
            navigate('/link-account');
        }
    }, []);

    return (
        <>
            <Subheader subheader={mangaFetched ? (`${titleRef.current}`) : ("Loading...")} />
            {mangaFetched ? <MangaCardCover
            // mangaCoverId={ } mangaCoverFileName={ }
            />
                :
                <MangaCardLoading />}
        </>
    )
}