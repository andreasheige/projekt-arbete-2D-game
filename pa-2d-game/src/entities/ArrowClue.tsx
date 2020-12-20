import React, { useRef, useCallback, useState } from 'react';
import Collider, { TriggerEvent } from '../@core/Collider';
import GameObject, { GameObjectProps, Position } from '../@core/GameObject';
import Sprite from '../@core/Sprite';
import spriteData from '../spriteData';
import useGameObject from '../@core/useGameObject';
import useGameObjectEvent from '../@core/useGameObjectEvent';
import { calcAngle } from '../@core/utils/rotation';

interface ArrowClueProps extends GameObjectProps {
    dest: Position;
}

function DirectArrayScript({ dest, setAngle, setTigged }) {
    const { transform } = useGameObject();

    useGameObjectEvent<TriggerEvent>('trigger', other => {
        if (other.name === 'player') {
            setAngle(calcAngle(transform.x, transform.y, dest.x, dest.y));
            setTigged(true);
        }
    });
    return null;
}

export default function ArrowClue(props: ArrowClueProps) {
    const childRef = useRef<THREE.Group>();
    const [angle, setAngle] = useState(0);
    const [isTigged, setTigged] = useState(false);
    const rotate = useCallback(() => {
        if (childRef && childRef.current) childRef.current.rotation.set(0, 0, angle);
    }, [angle]);

    rotate();
    return (
        <GameObject layer="obstacle" {...props}>
            <Collider isTrigger />
            <group ref={childRef}>
                {isTigged && <Sprite {...spriteData.arrowClue} />}
            </group>
            <DirectArrayScript
                dest={props.dest}
                setAngle={setAngle}
                setTigged={setTigged}
            />
        </GameObject>
    );
}
