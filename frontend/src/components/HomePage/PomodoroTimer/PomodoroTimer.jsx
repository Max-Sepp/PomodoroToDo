import React, { useState } from 'react';
import Timer from './Timer';
import SettingsContext from './SettingsContext';
import Settings from './Settings';

function HomePage() {

    const [settings, setSettings] = useState(true);
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
            {settings ? <Timer /> : <Settings />}
        </SettingsContext.Provider >
    )
}

export default HomePage