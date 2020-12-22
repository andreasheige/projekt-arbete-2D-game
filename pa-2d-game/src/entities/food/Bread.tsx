import React from 'react';
import Collider, { TriggerEvent } from '../../@core/Collider';
import GameObject, { GameObjectProps } from '../../@core/GameObject';
import { useSound } from '../../@core/Sound';
import Sprite from '../../@core/Sprite';
import useGame from '../../@core/useGame';
import useGameObject from '../../@core/useGameObject';
import useGameObjectEvent from '../../@core/useGameObjectEvent';
import soundData from '../../soundData';
import spriteData from '../../spriteData';

function DisableOnTriggerScript() {
    const { publish } = useGame();
    const { getRef } = useGameObject();
    const playSfx = useSound(soundData.eating);

    async function sendChangeScoreNotification() {
        await publish('CHANGE_SCORE', 10);
    }

    useGameObjectEvent<TriggerEvent>('trigger', other => {
        if (other.name === 'player') {
            sendChangeScoreNotification();
            getRef().setDisabled(true);
            playSfx();
        }
    });

    return null;
}

export default function Bread(props: GameObjectProps) {
    const name = `bread-${props.x}-${props.y}`; // fallback name required for persisted flag
    return (
        <GameObject name={name} persisted {...props}>
            <Sprite {...spriteData.food} state="bread" />
            <Collider isTrigger />
            <DisableOnTriggerScript />
        </GameObject>
    );
}
