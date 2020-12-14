import React, { useRef, useState, useCallback } from 'react';
import Collider, { TriggerEvent } from '../@core/Collider';
import GameObject, { GameObjectProps } from '../@core/GameObject';
import Sprite from '../@core/Sprite';
import useGameObjectEvent from '../@core/useGameObjectEvent';
import spriteData from '../spriteData';
import useGameLoop from '../@core/useGameLoop';

function TriggerScript({ onHit }) {
    useGameObjectEvent<TriggerEvent>('trigger', other => {
        if (other.name === 'player') {
            // TODO: signal score loss
            // eslint-disable-next-line no-console
            console.log('rubish collision');
            onHit();
        }
    });

    return null;
}

export default function Rubbish(props: GameObjectProps) {
    const [isHit, setGotHit] = useState(false);
    const childRef = useRef<THREE.Group>();
    const scaleFirst = useRef<THREE.Vector3>();
    const time0 = useRef(0); // when animation starts
    const name = `rubbish-${props.x}-${props.y}`; // fallback name required for persisted flag
    function handleHit() {
        setGotHit(true);
        scaleFirst.current = childRef.current.scale;
    }
    const scaleUp = useCallback(time => {
        if (time0.current === 0) {
            time0.current = time;
            return;
        }
        const timeDiff = time - time0.current;
        if (timeDiff > 1100) {
            time0.current = 0;
            childRef.current.scale.setX(1);
            childRef.current.scale.setY(1);
            setGotHit(false);
            return;
        }
        const scaleFactor = 1.0 + 0.00007 * timeDiff;
        childRef.current.scale.setY(scaleFirst.current.x * scaleFactor);
        childRef.current.scale.setX(scaleFirst.current.x * scaleFactor);
        const vobb = 0.25 * Math.sin(0.007 * time);
        childRef.current.rotation.set(0, 0, vobb);
    }, []);
    useGameLoop(time => {
        if (isHit && childRef.current) {
            scaleUp(time);
        }
    });
    return (
        <GameObject name={name} persisted {...props} layer="fx">
            <Sprite {...spriteData.objects} state="plant" />
            <group ref={childRef}>
                {isHit && (
                    <Sprite
                        {...spriteData.objects}
                        scale={0.6}
                        opacity={0.6}
                        state="ghost"
                    />
                )}
            </group>
            <Collider isTrigger />
            <TriggerScript onHit={handleHit} />
        </GameObject>
    );
}
