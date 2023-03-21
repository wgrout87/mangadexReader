import React, { useEffect, useRef, useState } from "react";
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useSiteContext } from "../utils/GlobalState";
import { UPDATE_USERNAME_AND_PASSWORD, UPDATE_SESSION_TOKEN_ETC } from "../utils/actions";

export default function Login() {
    const [state, dispatch] = useSiteContext();
    const usernameRef = useRef();
    const passwordRef = useRef();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const baseUrl = state.baseUrl;

    useEffect(() => {
        if (state.username) {
            navigate('/');
        }
    }, [state, navigate])

    const creds = {
        username: "",
        password: ""
    };

    let sessionToken, expires, refreshToken;

    function handleSubmit(e) {
        e.preventDefault();
        setError('');
        setLoading(true);

        const username = usernameRef.current.value;
        const password = passwordRef.current.value;
        localStorage.setItem('username', username);
        localStorage.setItem('password', password);

        creds.username = username;
        creds.password = password;
        dispatch({
            type: UPDATE_USERNAME_AND_PASSWORD,
            username: username,
            password: password
        });

        (async () => {
            try {
                const resp = await axios({
                    method: 'POST',
                    url: `${baseUrl}/auth/login`,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: creds
                });

                sessionToken = resp.data.token.session;
                expires = new Date().valueOf() + 15 * 60000
                refreshToken = resp.data.token.refresh;

                dispatch({
                    type: UPDATE_SESSION_TOKEN_ETC,
                    sessionToken: sessionToken,
                    expires: expires,
                    refreshToken: refreshToken,
                })
            }
            catch {
                setError("Failed to link account");
            }
        })();

        setLoading(false);
    }

    return (
        <>
            <Card className="bg-dark">
                <Card.Body>
                    <h2 className="text-center mb-4">Link MangaDex Account</h2>
                    {error && <Alert variant='danger'>{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id='username'>
                            <Form.Label>Username or Email</Form.Label>
                            <Form.Control ref={usernameRef} required />
                        </Form.Group>
                        <Form.Group id='password'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type='password' ref={passwordRef} required />
                        </Form.Group>
                        <Button disabled={loading} className='w-100' type='submit'>Submit</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Must have a MangaDex account.
            </div>
        </>
    )
}