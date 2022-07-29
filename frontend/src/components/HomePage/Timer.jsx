import React from 'react';
import Countdown from 'react-countdown';

const Completionist = () => <span>You finished good job on the work</span>;

function Timer(props) {
    return (
        <Countdown date={Date.now() + props.time}>
            <Completionist />
        </Countdown>
    )
}

export default Timer