import React from 'react';
import Timer from './Timer';

function HomePage() {
    return (
        <div className='grid grid-cols-1 md:grid-cols-3 max-w-7xl mx-auto'>
            <div className='md:col-span-2'><Timer /></div>

            <div className='h-96'>World!</div>
        </div>
    )
}

export default HomePage