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
import useGameEvent from '../@core/useGameEvent';
import { TRIEGGED_CLUE_ORDER } from '../constants/gameStates';
import { REVEAL_SPOT } from '../constants/events';

interface ArrowClueProps extends GameObjectProps {
    dest: Position;
    order: number;
}

function DirectArrayScript({ dest, setAngle, setTigged, clueOrder }) {
    const { transform } = useGameObject();
    const { setGameState, getGameState, findGameObjectsByXY } = useGame();

    // Will trigger arrow 2-3 in corrected order after spot has been revealed
    useGameEvent(
        REVEAL_SPOT,
        pos => {
            if (clueOrder === 1) return; // clue 1 will trigger by stepping on it
            const triggedClueOrder = getGameState(TRIEGGED_CLUE_ORDER);
            const expectedOrderNb = triggedClueOrder ? triggedClueOrder + 1 : 1;
            if (clueOrder === 3) clueOrder = 3;
            if (
                transform.x === pos.x &&
                transform.y === pos.y &&
                clueOrder === expectedOrderNb
            ) {
                const destPosObject = findGameObjectsByXY(pos.x, pos.y);
                // debugger;
                if (destPosObject.length !== 3) return;
                setAngle(calcAngle(transform.x, transform.y, dest.x, dest.y));
                setTigged(true);
                // setGameState(TRIEGGED_CLUE_ORDER, expectedOrderNb);
            }
        },
        []
    );

    // Will trigger Arrow by walking on it
    useGameObjectEvent<TriggerEvent>('trigger', other => {
        const triggedClueOrder = getGameState(TRIEGGED_CLUE_ORDER);
        const expectedOrderNb = triggedClueOrder ? triggedClueOrder + 1 : 1;
        if (other.name === 'player' && clueOrder === expectedOrderNb) {
            setAngle(calcAngle(transform.x, transform.y, dest.x, dest.y));
            setTigged(true);
            console.log('trigger clue', expectedOrderNb);
            setGameState(TRIEGGED_CLUE_ORDER, expectedOrderNb);
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
        <GameObject layer="ground" {...props}>
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
            {isTigged && <ScoreScript scoreChange={ARROW_CLUE_REWARD} once />}
        </GameObject>
    );
}
