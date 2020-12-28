import React, { CSSProperties, useEffect, useRef } from 'react';
import { HTML, HTMLProps } from 'drei';
import useGameLoop from '../@core/useGameLoop';
import useGame from '../@core/useGame';
import { PLAYER_POS } from '../constants/gameStates';

interface IntoTextProps extends HTMLProps {
    setDisplayIntroText: (display: boolean) => void;
    startPos: { x: number; y: number };
}

export default function IntoText(props: IntoTextProps) {
    const node = useRef<HTMLDivElement>();
    const { getGameState } = useGame();

    useEffect(() => {
        if (node.current?.parentElement) {
            node.current.parentElement.style.pointerEvents = 'none';
            node.current.parentElement.style.whiteSpace = 'nowrap';
        }
    }, []);

    useGameLoop(() => {
        const playerPos = getGameState(PLAYER_POS);
        const { startPos, setDisplayIntroText } = props;
        if (!startPos || !playerPos) return;
        if (startPos.x !== playerPos.x || startPos.y !== playerPos.y) {
            setDisplayIntroText(false);
        }
    });

    const style: CSSProperties = {
        zIndex: 0,
        position: 'fixed',
        bottom: 100,
        left: props.startPos.x * 30, // guessing
        fontSize: 50,
        color: '#7FFFD4',
    };
    return (
        <HTML ref={node} eps={0.1} fullscreen>
            <div style={style}>{props.children}</div>
        </HTML>
    );
}
