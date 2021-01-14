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
    const { getGameState, setGameState } = useGame();

    useEffect(() => {
        if (node.current?.parentElement) {
            node.current.parentElement.style.pointerEvents = 'none';
            node.current.parentElement.style.whiteSpace = 'nowrap';
        }
        // Making sure player starts at start position,
        // since position is used in gameloop
        const playerStartPos = { x: props.startPos.x, y: props.startPos.y };
        setGameState(PLAYER_POS, playerStartPos);
    }, [setGameState, props.startPos]);

    useGameLoop(() => {
        const playerPos = getGameState(PLAYER_POS);
        const { startPos, setDisplayIntroText } = props;
        if (!startPos || !playerPos) return;
        if (startPos.x !== playerPos.x || startPos.y !== playerPos.y) {
            setDisplayIntroText(false);
        }
    });

    const style: CSSProperties = {
        zIndex: 1000,
        position: 'fixed',
        bottom: 100,
        left: props.startPos.x * 20, // guessing
        fontSize: 30,
        color: '#eef4f2',
    };
    return (
        <HTML ref={node} eps={0.1} fullscreen>
            <div style={style}>{props.children}</div>
        </HTML>
    );
}
