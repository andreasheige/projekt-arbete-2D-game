import React, { CSSProperties, useEffect, useRef, useState } from 'react';
import { HTML, HTMLProps } from 'drei';
import useGameObjectEvent from '../@core/useGameObjectEvent';
import { TriggerEvent } from '../@core/Collider';
import useGameLoop from '../@core/useGameLoop';
import useGame from '../@core/useGame';
import Interactable, { InteractionEvent } from '../@core/Interactable';

interface IntoTextProps extends HTMLProps {
    scoreChange: number;
    once?: boolean;
    ignoreKey?: string; // do not work
}

export default function ScoreScript(props: IntoTextProps) {
    const node = useRef<HTMLDivElement>();
    const [isActive, setActive] = useState(false);
    const [textColor, setTextColor] = useState('green');
    const time0 = useRef(0);
    const hasBeenTriggedBefore = useRef(false);
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

    // note: this method seem to get cashed with initial props
    useGameObjectEvent<TriggerEvent>(
        'trigger',
        other => {
            if (props.once && hasBeenTriggedBefore.current) return;
            hasBeenTriggedBefore.current = true;
            if (other.name === 'player') {
                props.scoreChange < 0 ? setTextColor('red') : setTextColor('green');
                setActive(true);
                sendChangeScoreNotification();
            }
        },
        [props]
    );

    /* eslint-disable */
    useGameObjectEvent<InteractionEvent>('interaction', other => {
        // will ignore interaction first time
        if (props.once && !hasBeenTriggedBefore.current) {
          hasBeenTriggedBefore.current = true;
          return;
        }
        hasBeenTriggedBefore.current = true;
        if (other.name === 'player') {
            props.scoreChange < 0 ? setTextColor('red') : setTextColor('green');
            setActive(true);
            sendChangeScoreNotification();
        }
    }, []);
  /* eslint-enable */

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
                <div style={style}>{props.scoreChange}</div>
            </HTML>
        </group>
    );
}
