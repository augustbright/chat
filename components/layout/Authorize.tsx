import React from 'react';
import {useSelector} from 'react-redux';
import {selectIsLoggedIn} from '../../redux/selectors';
import {useRouter} from 'next/router';

export default ({children}) => {
    const router = useRouter();
    const isLoggedIn = useSelector(selectIsLoggedIn);
    if (!isLoggedIn && router.pathname !== '/welcome') {
        router.replace('/welcome');
    } else if (isLoggedIn && router.pathname === '/welcome') {
        router.replace('/');
    }
    return (
        <>
            {children}
        </>
    );
};