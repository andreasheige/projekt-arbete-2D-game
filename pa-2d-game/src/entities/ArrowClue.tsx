import React, { useRef, useCallback, useState } from 'react';
import Collider, { TriggerEvent } from '../@core/Collider';
import GameObject, { GameObjectProps, Position } from '../@core/GameObject';
import Sprite from '../@core/Sprite';
import spriteData from '../spriteData';
import useGameObject from '../@core/useGameObject';
import useGameObjectEvent from '../@core/useGameObjectEvent';
import { calcAngle } from '../@core/utils/rotation';
import useGame from '../@core/useGame';
import ScoreScript from '../components/ScoreScript';
import { ARROW_CLUE_REWARD } from '../constants/points';

interface ArrowClueProps extends GameObjectProps {
    dest: Position;
    order: number;
}

function DirectArrayScript({ dest, setAngle, setTigged, clueOrder }) {
    const { transform } = useGameObject();
    const { setGameState, getGameState } = useGame();

    useGameObjectEvent<TriggerEvent>('trigger', other => {
        /* eslint-disable */
        const triggedClueOrder = getGameState('TRIEGGED_CLUE_ORDER');
        const expectedOrderNb = triggedClueOrder ? triggedClueOrder + 1 : 1;
        /* eslint-enable */
        if (other.name === 'player' && clueOrder === expectedOrderNb) {
            setAngle(calcAngle(transform.x, transform.y, dest.x, dest.y));
            setTigged(true);
            setGameState('TRIEGGED_CLUE_ORDER', expectedOrderNb);
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
                clueOrder={props.order}
            />
            <ScoreScript scoreChange={ARROW_CLUE_REWARD} once />
        </GameObject>
    );
}
