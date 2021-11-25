import React, { useContext } from 'react';
import TopBar from '../../Components/SessionTopBar/TopBar';
import { AuthCtx } from '../../Contexts/authContext';
import { UserTypes } from '../../Models/userTypes';
import AdminView from './AdminView/AdminView';
import { useNavigate } from 'react-router';


export default function Session() {
    const nav = useNavigate();
    const { user, setUser } = useContext(AuthCtx);
    React.useEffect(() => {
        if (!user) {
            let fetchedUser = localStorage.getItem('user');
            if (fetchedUser) {
                setUser(JSON.parse(fetchedUser));
                console.log(user);
            } else {
                nav('/login')
            }
        }
    }, [user]);
    console.log('this user is ', (user?.type === UserTypes.ADMIN));
    return (
        <div>
            <TopBar sessionName="UDC" />
            {user?.type === UserTypes.ADMIN ? <AdminView /> : null}
        </div>
    );
}
