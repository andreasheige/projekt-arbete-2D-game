import React from 'react';
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

function TriggerScript() {
    const { getComponent, getRef } = useGameObject();
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
            getComponent<MoveableRef>('Moveable').move(destPos);
        } else if (getGameState('CLEANING_EQUIPPED')) {
            publish(REVEAL_SPOT, attemPos);
            getRef().setDisabled(true);
            setGameState('CLEANING_EQUIPPED', false);
            playEat();
        }
    });

    return null;
}

export default function MovableRubbish(props: GameObjectProps) {
    return (
        <GameObject layer="obstacle" {...props}>
            <Moveable />
            <Interactable />
            <Collider />
            <Sprite {...spriteData.objects} state="plant" offset={{ x: 0, y: 0.25 }} />
            <TriggerScript />
        </GameObject>
    );
}
