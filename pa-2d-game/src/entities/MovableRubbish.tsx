import React, { useRef, useState } from 'react';
import Collider, { CollisionEvent } from '../@core/Collider';
import GameObject, { GameObjectProps } from '../@core/GameObject';
import Sprite from '../@core/Sprite';
import spriteData from '../spriteData';
import Interactable from '../@core/Interactable';
import Moveable, { MoveableRef } from '../@core/Moveable';
import useGameObjectEvent from '../@core/useGameObjectEvent';
import useGameObject from '../@core/useGameObject';
import useGame from '../@core/useGame';
import { PLAYER_POS, ATTEMP_MOVE_POS } from '../constants/gameStates';
import soundData from '../soundData';
import { useSound } from '../@core/Sound';
import { REVEAL_SPOT } from '../constants/events';
import useGameLoop from '../@core/useGameLoop';

function TriggerScript() {
    const { getComponent, getRef, publish: pub } = useGameObject();
    const { getGameState, setGameState, findGameObjectsByXY, publish } = useGame();
    const playPush = useSound(soundData.push);
    const playEat = useSound(soundData.eating);

    function tileIsFree(pos) {
        const destPosObject = findGameObjectsByXY(pos.x, pos.y);
        return (
            destPosObject.find(i => i.layer === 'obstacle' || i.layer === 'wall') ===
            undefined
        );
    }

    useGameObjectEvent<CollisionEvent>('collision', () => {
        const attemPos = getGameState(ATTEMP_MOVE_POS);
        const pos = getGameState(PLAYER_POS);
        const diff = { x: attemPos.x - pos.x, y: attemPos.y - pos.y };
        const destPos = { x: attemPos.x + diff.x, y: attemPos.y + diff.y };
        if (tileIsFree(destPos)) {
            publish(REVEAL_SPOT, attemPos);
            playPush();
            pub('BUMP_INTO', getRef());
            getComponent<MoveableRef>('Moveable').move(destPos);
        } else if (getGameState('CLEANING_EQUIPPED')) {
            publish(REVEAL_SPOT, attemPos);
            publish('USE_BUCKET');
            getRef().setDisabled(true);
            setGameState('CLEANING_EQUIPPED', false);
            playEat();
        } else {
            pub('BUMP_INTO', getRef());
        }
    });

    return null;
}

interface Props {
    children: React.ReactNode;
}

function BumpScriptScript(props: Props) {
    const childRef = useRef<THREE.Group>();
    const [isActive, setActive] = useState(false);
    const time0 = useRef(0);
    useGameObjectEvent('BUMP_INTO', () => {
        setActive(true);
    });
    useGameLoop(t => {
        if (isActive && time0.current === 0) {
            time0.current = t;
            return;
        }
        if (!isActive) return;
        let timeDiff = (t - time0.current) * 2.0;
        const towardsZero = Math.cos((Math.PI * timeDiff) / 3000.0);
        if (timeDiff > 1500) {
            setActive(false);
            time0.current = 0;
            timeDiff = 0;
        }
        const bounce = 0.2 * Math.sin(0.01 * timeDiff) * towardsZero;
        childRef.current.rotation.set(0, 0, bounce);
    });
    return <group ref={childRef}> {props.children}</group>;
}

export default function MovableRubbish(props: GameObjectProps) {
    return (
        <GameObject layer="obstacle" {...props}>
            <Moveable />
            <Interactable />
            <Collider />
            <BumpScriptScript>
                <Sprite
                    {...spriteData.garbage}
                    // state="garbage"
                    offset={{ x: 0, y: 0 }}
                />
            </BumpScriptScript>
            <TriggerScript />
        </GameObject>
    );
}
