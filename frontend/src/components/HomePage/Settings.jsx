import React, { useContext } from 'react';
import SettingsContext from './SettingsContext';
import Slider from 'rc-slider';
import "rc-slider/assets/index.css";



function Settings() {

    const settings = useContext(SettingsContext)

    return (
        <div className='mx-auto w-fit pt-5'>
            <Slider
                className='my-5'
                min={1}
                max={120}
                railStyle={{
                    height: 2
                }}
                handleStyle={{
                    height: 28,
                    width: 28,
                    marginTop: -14,
                    backgroundColor: "red",
                    border: 0
                }}
                trackStyle={{
                    background: "none"
                }}
            />
            <button className='bg-indigo rounded-lg p-2 text-white w-56' onClick={() => { settings.setSettings(true) }}>Go Back</button>
        </div>
    )
}

export default Settings