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
            console.log('redbutton collision', other);

            other.subscribe('buttonclick', () => {
                console.log('sssss');
            });
        }
    });

    return null;
}

export default function PowerButton(props: GameObjectProps) {
    return (
        <GameObject layer="obstacle" {...props}>
            <Collider isTrigger />
            <Sprite
                {...spriteData.objects}
                state="redbutton"
                offset={{ x: 0, y: 0.25 }}
            />
            <TriggerScript />
        </GameObject>
    );
}
