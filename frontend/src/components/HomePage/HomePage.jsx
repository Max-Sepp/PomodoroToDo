import React from 'react';
import PomodoroTimer from './PomodoroTimer/PomodoroTimer'

function HomePage() {
    return (
        <div className='max-w-7xl grid md:grid-cols-3 grid-cols-1'>
            <div className='md:col-span-2'><PomodoroTimer /></div>
            <div>Todo</div>
        </div>
    )
}

export default HomePage