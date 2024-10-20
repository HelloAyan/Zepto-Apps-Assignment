import React from 'react'
import Header from '../components/Header';
import { Outlet } from "react-router-dom";

const DefaultLayout = () => {
    return (
        <div className='w-full h-full'>
            <Header />
            <Outlet />
        </div>
    )
}

export default DefaultLayout;