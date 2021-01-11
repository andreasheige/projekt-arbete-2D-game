import React, { CSSProperties, useEffect, useRef, useState } from 'react';
import { HTML, HTMLProps } from 'drei';
import useGameObjectEvent from '../@core/useGameObjectEvent';
import { TriggerEvent } from '../@core/Collider';
import useGameLoop from '../@core/useGameLoop';
import useGame from '../@core/useGame';

interface IntoTextProps extends HTMLProps {
    once?: boolean;
    ignoreKey?: string; // do not work
}

export default function ScoreScript(props: IntoTextProps) {
    const node = useRef<HTMLDivElement>();
    const [isActive, setActive] = useState(false);
    const [textColor, setTextColor] = useState('green');
    const [text, setText] = useState('0');
    const time0 = useRef(0);
    const hasBeenTriggedBefore = useRef(false);
    const childRef = useRef<THREE.Group>();
    const { publish } = useGame();

    async function sendChangeScoreNotification(score: number) {
        await publish('CHANGE_SCORE', score);
    }

    useEffect(() => {
        if (node.current?.parentElement) {
            node.current.parentElement.style.pointerEvents = 'none';
            node.current.parentElement.style.whiteSpace = 'nowrap';
        }
    }, []);

    // note: this method seem to get cashed with initial props
    useGameObjectEvent<TriggerEvent>(
        'trigger',
        other => {
            if (props.once && hasBeenTriggedBefore.current) return;
            hasBeenTriggedBefore.current = true;
            if (other.name === 'followingRat') {
                setTextColor('green');
                setActive(true);
                setText('10');
                sendChangeScoreNotification(10);
            } else if (other.name === 'player') {
                setTextColor('red');
                setActive(true);
                setText('-15');
                sendChangeScoreNotification(-15);
            }
        },
        [props]
    );

    useGameLoop(time => {
        if (!isActive) return;
        if (time0.current === 0) time0.current = time;
        if (childRef.current.position) {
            const diffY = (time - time0.current) * 0.002;
            const diffX = 0.1 * Math.sin((time - time0.current) * 0.01);
            childRef.current.position.set(diffX, diffY, 0);
            if (diffY > 2) {
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
                <div style={style}>{text}</div>
            </HTML>
        </group>
    );
}
