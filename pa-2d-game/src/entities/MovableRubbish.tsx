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
import { PLAYER_POS } from '../constants/gameStates';
import soundData from '../soundData';
import { useSound } from '../@core/Sound';

function TriggerScript() {
    const { getComponent, getRef } = useGameObject();
    const { getGameState, setGameState, findGameObjectsByXY } = useGame();
    const playPush = useSound(soundData.push);
    const playEat = useSound(soundData.eating);

    function tileIsFree(pos) {
        const destPosObject = findGameObjectsByXY(pos.x, pos.y);
        return destPosObject.find(i => i.layer === 'obstacle') === undefined;
    }

    useGameObjectEvent<CollisionEvent>('collision', () => {
        const attemPos = getGameState('ATTEMP_MOVE_POS');
        const pos = getGameState(PLAYER_POS);
        const diff = { x: attemPos.x - pos.x, y: attemPos.y - pos.y };
        const destPos = { x: attemPos.x + diff.x, y: attemPos.y + diff.y };

        if (tileIsFree(destPos)) {
            playPush();
            getComponent<MoveableRef>('Moveable').move(destPos);
        } else if (getGameState('CLEANING_EQUIPPED')) {
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
