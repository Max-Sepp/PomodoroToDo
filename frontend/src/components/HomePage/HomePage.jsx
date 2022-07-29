import React from 'react';
import Timer from './Timer';

function HomePage() {
    return (
        <div className='grid grid-cols-1 md:grid-cols-3 max-w-7xl'>
            <div className='md:col-span-2 md:text-6xl sm:text-5xl text-4xl text-center text-b-green py-10'><Timer time={5000} /></div>
            <div>World!</div>
        </div>
    )
}

export default HomePage