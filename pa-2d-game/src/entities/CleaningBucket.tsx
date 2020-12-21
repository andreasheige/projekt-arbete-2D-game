import React from 'react';
import Collider, { TriggerEvent } from '../@core/Collider';
import GameObject, { GameObjectProps } from '../@core/GameObject';
import Sprite from '../@core/Sprite';
import spriteData from '../spriteData';
import useGameObjectEvent from '../@core/useGameObjectEvent';
import useGame from '../@core/useGame';

function TriggerScript() {
    const { publish, setGameState } = useGame();
    async function sendNotification() {
        await publish('CLEANING_EQUIPPED', {});
    }
    useGameObjectEvent<TriggerEvent>('trigger', other => {
        if (other.name === 'player') {
            sendNotification();
            setGameState('CLEANING_EQUIPPED', true);
        }
    });
    return null;
}

export default function CleaningBucket(props: GameObjectProps) {
    return (
        <GameObject layer="obstacle" {...props}>
            <Collider isTrigger />
            <Sprite {...spriteData.cleaningBucket} offset={{ x: 0, y: 0.0 }} />
            <TriggerScript />
        </GameObject>
    );
}
