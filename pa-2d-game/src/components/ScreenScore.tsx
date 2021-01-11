import React, { CSSProperties, useContext } from 'react';
import { ScoreContext } from '../@core/useScore';

export default function ScreenScore() {
    const { score } = useContext(ScoreContext);
    const myStyles: CSSProperties = {
        zIndex: 1000,
        position: 'fixed',
        top: 100,
        left: 100,
        fontSize: 30,
        pointerEvents: 'none',
    };
    return <div style={myStyles}>Score: {score} </div>;
}
