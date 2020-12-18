import React from 'react';
import Collider, { TriggerEvent } from '../@core/Collider';
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
    const { getComponent } = useGameObject();
    const { getGameState, findGameObjectsByXY } = useGame();

    function tileIsFree(pos) {
        const destPosObject = findGameObjectsByXY(pos.x, pos.y);
        // assuming the tile only contains ground object
        return destPosObject.length === 1;
    }

    useGameObjectEvent<TriggerEvent>('trigger', other => {
        if (other.name === 'player') {
            const prevPos = getGameState(PREV_PLAYER_POS);
            const pos = getGameState(PLAYER_POS);
            const diff = { x: pos.x - prevPos.x, y: pos.y - prevPos.y };
            const dest = { x: pos.x + diff.x, y: pos.y + diff.y };
            if (tileIsFree(dest)) {
                getComponent<MoveableRef>('Moveable').move(dest);
            }
        }
    });

    return null;
}

export default function MovableRubbish(props: GameObjectProps) {
    return (
        <GameObject layer="obstacle" {...props}>
            <Moveable />
            <Interactable />
            <Collider isTrigger />
            <Sprite {...spriteData.objects} state="plant" offset={{ x: 0, y: 0.25 }} />
            <TriggerScript />
        </GameObject>
    );
}
