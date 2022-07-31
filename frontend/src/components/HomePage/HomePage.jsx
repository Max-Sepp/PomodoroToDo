import React, { useState } from 'react';
import Timer from './Timer';
import SettingsContext from './SettingsContext';
import Settings from './Settings';

function HomePage() {

    const [settings, setSettings] = useState(false);
    const [workTime, setWorkTime] = useState(25);
    const [breakTime, setBreakTime] = useState(5);
    return (
        <SettingsContext.Provider value={{
            settings,
            setSettings,
            workTime,
            setWorkTime,
            breakTime,
            setBreakTime
        }}>
            <div className='grid grid-cols-1 md:grid-cols-3 max-w-7xl mx-auto'>
                <div className='md:col-span-2'>{settings ? <Timer /> : <Settings />}</div>

                <div className=''>World!</div>
            </div>
        </SettingsContext.Provider >
    )
}

export default HomePage