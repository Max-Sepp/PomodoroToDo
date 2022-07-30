import React, { useContext } from 'react';
import SettingsContext from './SettingsContext';


function Settings() {

    const settings = useContext(SettingsContext)

    return (
        <button onClick={() => { settings.setSettings(true) }}>Go Back</button>
    )
}

export default Settings