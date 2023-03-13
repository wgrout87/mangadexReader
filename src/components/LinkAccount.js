import React, { useEffect, useRef, useState } from "react";
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useSiteContext } from "../utils/GlobalState";

export default function Login() {
    const [state, dispatch] = useSiteContext();
    const usernameRef = useRef();
    const passwordRef = useRef();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const baseUrl = state.baseUrl;

    const creds = {
        username: "",
        password: ""
    };

    let sessionToken, expires, refreshToken;

    (async () => {
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

        console.log(sessionToken, expires, refreshToken);
    })();

    function handleSubmit(e) {
        setLoading(true);
        localStorage.setItem('username', usernameRef.current.value);
        localStorage.setItem('password', passwordRef.current.value);

        setLoading(false);
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Log In</h2>
                    {error && <Alert variant='danger'>{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id='email'>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type='email' ref={usernameRef} required />
                        </Form.Group>
                        <Form.Group id='password'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type='password' ref={passwordRef} required />
                        </Form.Group>
                        <Button disabled={loading} className='w-100' type='submit'>Log In</Button>
                    </Form>
                    <div className="w-100 text-center mt-2">
                        <Link to='/forgot-password'>Forgot Password</Link>
                    </div>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Need an account? <Link to='/signup'>Sign Up</Link>
            </div>
        </>
    )
}