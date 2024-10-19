import React from 'react'

const Loader = () => {
    return (
        <div className='flex space-x-2 justify-center items-center bg-white h-screen '>
            <span className='sr-only text-[var(--primary-color)]'>Loading...</span>
            <div className='h-6 w-6 bg-[var(--primary-color)]  rounded-full animate-bounce [animation-delay:-0.3s]'></div>
            <div className='h-6 w-6 bg-[var(--primary-color)] rounded-full animate-bounce [animation-delay:-0.15s]'></div>
            <div className='h-6 w-6 bg-[var(--primary-color)] rounded-full animate-bounce'></div>
        </div>
    )
}

export default Loader;