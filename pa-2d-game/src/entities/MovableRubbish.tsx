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
import { PREV_PLAYER_POS, PLAYER_POS } from '../constants/gameStates';

function TriggerScript() {
    const { getComponent, getRef } = useGameObject();
    const { getGameState, setGameState, findGameObjectsByXY } = useGame();

    function tileIsFree(pos) {
        const destPosObject = findGameObjectsByXY(pos.x, pos.y);
        return destPosObject.find(i => i.layer === 'obstacle') === undefined;
    }

    useGameObjectEvent<CollisionEvent>('collision', () => {
        const prevPos = getGameState(PREV_PLAYER_POS);
        const pos = getGameState(PLAYER_POS);
        const diff = { x: pos.x - prevPos.x, y: pos.y - prevPos.y };
        const dest = { x: pos.x + diff.x, y: pos.y + diff.y };
        if (tileIsFree(dest)) {
            getComponent<MoveableRef>('Moveable').move(dest);
        } else if (getGameState('CLEANING_EQUIPPED')) {
            getRef().setDisabled(true);
            setGameState('CLEANING_EQUIPPED', false);
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
