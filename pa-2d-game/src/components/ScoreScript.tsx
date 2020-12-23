import React, { CSSProperties, useEffect, useRef, useState } from 'react';
import { HTML, HTMLProps } from 'drei';
import useGameObjectEvent from '../@core/useGameObjectEvent';
import { TriggerEvent } from '../@core/Collider';
import useGameLoop from '../@core/useGameLoop';
import useGame from '../@core/useGame';

interface IntoTextProps extends HTMLProps {
    scoreChange: number;
}

export default function ScoreScript(props: IntoTextProps) {
    const node = useRef<HTMLDivElement>();
    const [isActive, setActive] = useState(false);
    const [textColor, setTextColor] = useState('green');
    const time0 = useRef(0);
    const childRef = useRef<THREE.Group>();
    const { publish } = useGame();

    async function sendChangeScoreNotification() {
        await publish('CHANGE_SCORE', props.scoreChange);
    }

    useEffect(() => {
        if (node.current?.parentElement) {
            node.current.parentElement.style.pointerEvents = 'none';
            node.current.parentElement.style.whiteSpace = 'nowrap';
        }
    }, []);

    useGameObjectEvent<TriggerEvent>('trigger', other => {
        if (other.name === 'player') {
            props.scoreChange < 0 ? setTextColor('red') : setTextColor('green');
            setActive(true);
            sendChangeScoreNotification();
        }
    });

    useGameLoop(time => {
        if (!isActive) return;
        if (time0.current === 0) time0.current = time;
        if (childRef.current.position) {
            const diff = (time - time0.current) * 0.002;
            childRef.current.position.set(0, diff, 0);
            if (diff > 2) {
                setActive(false);
                time0.current = 0;
            }
        }
    });

    const style: CSSProperties = {
        zIndex: 1000,
        fontSize: 25,
        fontWeight: 'lighter',
        color: textColor,
    };
    if (!isActive) return null;
    return (
        <group ref={childRef}>
            <HTML ref={node} eps={0.1}>
                <div style={style}>{props.scoreChange}</div>
            </HTML>
        </group>
    );
}
