import React from 'react';
import Collider, { TriggerEvent } from '../@core/Collider';
import GameObject, { GameObjectProps } from '../@core/GameObject';
import Sprite from '../@core/Sprite';
import useGameObjectEvent from '../@core/useGameObjectEvent';
import spriteData from '../spriteData';

function TriggerScript() {
    useGameObjectEvent<TriggerEvent>('trigger', other => {
        if (other.name === 'player') {
            // TODO: signal score loss
            // eslint-disable-next-line no-console
            // console.log('rubish collision');
        }
    });

    return null;
}

export default function Rubbish(props: GameObjectProps) {
    const name = `rubbish-${props.x}-${props.y}`; // fallback name required for persisted flag
    return (
        <GameObject name={name} persisted {...props}>
            <Sprite {...spriteData.objects} state="plant" />
            <Collider isTrigger />
            <TriggerScript />
        </GameObject>
    );
}
