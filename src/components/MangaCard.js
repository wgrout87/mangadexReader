import React, { useState } from "react";
import { Card, Button } from 'react-bootstrap';
import axios from 'axios';
import { useSiteContext } from "../utils/GlobalState";
import { findObjByType } from "../utils/helpers";

export default function MangaCard(props) {
    const [state] = useSiteContext();
    const baseUrl = state.baseUrl;

    const [mangaCoverId, setMangaCoverId] = useState();
    const [mangaCoverFileName, setMangaCoverFileName] = useState();

    let getChapter = (async () => {
        const resp = await axios({
            method: 'GET',
            url: `${baseUrl}/manga/${props.id}?includes[]=author&includes[]=artist&includes[]=cover_art`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${state.sessionToken}`
            },
        });

        return resp.data.data;
    });

    getChapter().then(resp => {
        setMangaCoverId(resp.id);
        setMangaCoverFileName(findObjByType(resp.relationships, "cover_art").attributes.fileName)
    });

    return <Card className="bg-dark">
        <Card.Body>
            <h2 className="text-center mb-4">{`${props.index + 1}`}</h2>
            <img src={`https://uploads.mangadex.org/covers/${mangaCoverId}/${mangaCoverFileName}.256.jpg`} alt="manga cover" />
        </Card.Body>
    </Card>
}