import React, { useState, useContext, useEffect } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css'
import SettingsContext from './SettingsContext';
import { IoPlayCircle, IoPauseCircle, IoSettingsSharp } from "react-icons/io5";
import useInterval from './useInterval';

function Timer() {
    const settings = useContext(SettingsContext);

    const [paused, setPaused] = useState(true);
    const [mode, setMode] = useState('work')
    const [remainingSeconds, setRemainingSeconds] = useState(0)

    useEffect(() => {
        setPaused(true)
        setRemainingSeconds(settings.workTime * 60);
    }, [settings]);

    // reduce timer by 1 every second
    useInterval(() => {
        if (paused) {
            return;
        } else if (remainingSeconds === 0) {
            const nextMode = mode === 'work' ? 'break' : 'work';
            const nextSeconds = (nextMode === 'work' ? settings.workTime : settings.breakTime) * 60;

            setMode(nextMode);
            setRemainingSeconds(nextSeconds);
        } else {
            setRemainingSeconds(remainingSeconds - 1)
        }
    }, 1000)

    const totalSeconds = mode === 'work'
        ? settings.workTime * 60
        : settings.breakTime * 60;

    const percentage = Math.round(remainingSeconds / totalSeconds * 100)

    const minutes = Math.floor(remainingSeconds / 60);
    let seconds = remainingSeconds % 60;
    if (seconds < 10) seconds = '0' + seconds;

    return (
        <div className='mx-auto w-fit pt-5'>
            <CircularProgressbar
                value={percentage}
                text={minutes + ':' + seconds}
                styles={buildStyles({
                    textColor: '#360568',
                    pathColor: mode === 'work' ? '#360568' : '#4B644A',
                    tailColor: '#F9F0F6',
                })}
            />
            {paused
                ? <IoPlayCircle className='mt-4 mx-auto' size={100} color='#090C09' onClick={() => { setPaused(false); }} />
                : <IoPauseCircle className='mt-4 mx-auto' size={100} color='#090C09' onClick={() => { setPaused(true); }} />}
            <IoSettingsSharp className='mt-4 mx-auto pb-5' size={45} color='#090C09' onClick={() => { settings.setSettings(false) }} />
        </div>
    )
}

export default Timer