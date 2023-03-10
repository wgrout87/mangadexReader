import { Outlet, redirect } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Header from './Header';

export default function Root() {
    const { currentUser } = useAuth();

    return (
        <>
            <Header />
            <div id='detail'>
                <Outlet />
            </div>
        </>
    )
}