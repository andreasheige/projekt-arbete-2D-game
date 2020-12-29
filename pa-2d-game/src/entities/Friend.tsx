import React from 'react';
import CharacterScript from '../components/CharacterScript';
import Collider, { TriggerEvent } from '../@core/Collider';
import GameObject, { GameObjectProps } from '../@core/GameObject';
import Sprite from '../@core/Sprite';
import spriteData from '../spriteData';
import useGameObject from '../@core/useGameObject';
import useGameObjectEvent from '../@core/useGameObjectEvent';
import useGame from '../@core/useGame';

function DisableOnTriggerScript() {
    // const { getRef } = useGameObject();
    const { publish } = useGame();

    async function sendTalkNotification() {
        await publish('TALKED_TO_FRIEND');
    }

    useGameObjectEvent<TriggerEvent>('trigger', other => {
        if (other.name === 'player') {
            sendTalkNotification();
        }
    });

    return null;
}

export default function Friend(props: GameObjectProps) {
    return (
        <GameObject layer="item" {...props}>
            <Collider isTrigger />
            <CharacterScript>
                <Sprite {...spriteData.objects} state="pizza" />
            </CharacterScript>
            <DisableOnTriggerScript />
        </GameObject>
    );
}
