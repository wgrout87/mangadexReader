import { Outlet, redirect } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Root() {
    const { currentUser } = useAuth();

    return (
        <>
            <div id='detail'>
                <Outlet />
            </div>
        </>
    )
}