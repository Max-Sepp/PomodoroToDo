import React from 'react';
import PomodoroTimer from './PomodoroTimer/PomodoroTimer';
import ToDo from './Todos/ToDo';

function HomePage() {
    return (
        <div className='max-w-7xl grid lg:grid-cols-3 grid-cols-1'>
            <div><PomodoroTimer /></div>
            <div className='lg:col-span-2'><ToDo /></div>
        </div>
    )
}

export default HomePage