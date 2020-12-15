import React, { CSSProperties, useContext } from 'react';
import { ScoreContext } from './ScoreContext';

export default function ScreenScore() {
    console.log('render');
    const { score } = useContext(ScoreContext);
    const myStyles: CSSProperties = {
        zIndex: 1000,
        position: 'fixed',
        top: 100,
        left: 100,
        fontSize: 50,
    };
    return <div style={myStyles}>Score: {score} </div>;
}
