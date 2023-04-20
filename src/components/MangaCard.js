import React from "react";
import { Card, Button } from 'react-bootstrap';
import axios from 'axios';
import { useSiteContext } from "../utils/GlobalState";

export default function MangaCard(props) {
    const [state] = useSiteContext();
    const baseUrl = state.baseUrl;

    let getChapter = (async () => {
        const resp = await axios({
            method: 'GET',
            url: `${baseUrl}/chapter/${props.id}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${state.sessionToken}`
            },
        });

        return resp.data.data;
    });

    console.log("MangaCard created!");
    console.log(getChapter());
    return <Card>
        <Card.Body>
            <h2 className="text-center mb-4">Dashboard</h2>
            <strong>Email:</strong> "email"
        </Card.Body>
    </Card>
}