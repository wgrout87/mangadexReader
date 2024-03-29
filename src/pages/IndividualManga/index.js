import React, { useEffect, useState, useRef } from "react";
import { Card, Button } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useSiteContext } from "../../utils/GlobalState";
import { UPDATE_EVERYTHING } from "../../utils/actions";
import { sessionIsExpired } from "../../utils/helpers";
import Subheader from "../../components/Header/Subheader";
import { MangaCardCover, MangaCardLoading } from "../../components/MangaCard";
import { findObjByType } from "../../utils/helpers";
import ChapterInfo from "../../components/ChapterInfo";
import { Link } from "react-router-dom";
import "./style.css";

export default function IndividualManga() {
    const [state, dispatch] = useSiteContext();
    const [mangaFetched, setMangaFetched] = useState(false);
    const [mangaFeedFetched, setMangaFeedFetched] = useState(false);
    const [refreshingSession, setRefreshingSession] = useState(false);
    const [sessionRefreshed, setSessionRefreshed] = useState(false);
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const baseUrl = state.baseUrl;
    const titleRef = useRef();
    const mangaRef = useRef();
    const mangaFeedRef = useRef();

    const mangaId = (window.location.search.replace(/^./, ""));

    let getManga = async () => {
        const resp = await axios({
            method: 'GET',
            url: `${baseUrl}/manga/${mangaId}?includes[]=author&includes[]=artist&includes[]=cover_art`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${state.sessionToken}`
            },
        });

        // Looks for an AltTitle in Egnlish - enAltTitle will be null if none is found
        let enAltTitle = resp.data.data.attributes.altTitles.find(element => element.en);
        if (enAltTitle) {
            enAltTitle = enAltTitle.en;
        }

        titleRef.current = (enAltTitle) ?? (resp.data.data.attributes.title.en);
        console.log(resp.data.data);
        mangaRef.current = resp.data.data;

        setMangaFetched(true);

        return resp;
    }

    let getMangaFeed = async () => {
        const resp = await axios({
            method: 'GET',
            url: `${baseUrl}/manga/${mangaId}/feed`,
            params: {
                limit: 20,
                translatedLanguage: ["en"],
                offset: 0,
                order: {
                    chapter: "desc"
                }
            },
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${state.sessionToken}`
            },
        });

        console.log(resp.data.data);
        mangaFeedRef.current = resp.data.data;

        setMangaFeedFetched(true);

        return resp;
    }

    useEffect(() => {
        getManga();
        getMangaFeed();
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
            <div className="relative">
                <Subheader subheader={mangaFetched ? (`${titleRef.current}`) : ("Loading...")} />
                {/* Background banner */}
                {mangaFetched ?
                    <MangaCardCover className="banner" zeroBorderRadius={true} shade={true}
                        mangaCoverId={mangaRef.current.id} mangaCoverFileName={findObjByType(mangaRef.current.relationships, "cover_art").attributes.fileName}
                    />
                    :
                    <MangaCardLoading />
                }

                {/* Manga cover card */}
                {mangaFetched ?
                    <MangaCardCover className="manga-card" zeroBorderRadius={true}
                        mangaCoverId={mangaRef.current.id} mangaCoverFileName={findObjByType(mangaRef.current.relationships, "cover_art").attributes.fileName}
                    />
                    :
                    <MangaCardLoading />
                }
            </div>
            <section>
                {!mangaFeedFetched ? (
                    <h2>Loading...</h2>
                ) : (
                    mangaFeedRef.current.map((chapter, index) =>
                        <Link to={`/chapter?${chapter.id}`}>
                            <ChapterInfo chapter={chapter} key={index + chapter.id} />
                        </Link>
                    )
                )}
            </section>
        </>
    )
}