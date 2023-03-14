import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import { useSiteContext } from "../utils/GlobalState";
import { UPDATE_PAGE } from "../utils/actions";

export default function ForgotPassword() {
    const emailRef = useRef();
    const { resetPassword } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [, dispatch] = useSiteContext();

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setMessage('');
            setError('');
            setLoading(true);
            await resetPassword(emailRef.current.value);
            setMessage('Check your inbox for further instructions')
        } catch {
            setError('Failed to reset password');
        };

        setLoading(false);
    }

    return (
        <>
            <Card className="bg-dark">
                <Card.Body>
                    <h2 className="text-center mb-4">Password Reset</h2>
                    {error && <Alert variant='danger'>{error}</Alert>}
                    {message && <Alert variant='success'>{message}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id='email'>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type='email' ref={emailRef} required />
                        </Form.Group>
                        <Button disabled={loading} className='w-100' type='submit'>Reset Password</Button>
                    </Form>
                    <div className="w-100 text-center mt-2">
                        <Link to='/signin' onClick={() => {
                            dispatch({
                                type: UPDATE_PAGE,
                                page: "Sign In"
                            })
                        }}>Sign In</Link>
                    </div>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Need an account? <Link to='/signup' onClick={() => {
                    dispatch({
                        type: UPDATE_PAGE,
                        page: "Sign Up"
                    })
                }}>Sign Up</Link>
            </div>
        </>
    );
};