import React from 'react';
import Collider, { TriggerEvent } from '../@core/Collider';
import GameObject, { GameObjectProps } from '../@core/GameObject';
import Sprite from '../@core/Sprite';
import spriteData from '../spriteData';
import RunningAwayScript from '../components/RunningAwayScript';
import Moveable from '../@core/Moveable';
import useGameObjectEvent from '../@core/useGameObjectEvent';
import useGame from '../@core/useGame';
import useGameObject from '../@core/useGameObject';
import { useSound } from '../@core/Sound';
import soundData from '../soundData';

function TriggerScript() {
    const { publish } = useGame();
    const { getRef } = useGameObject();
    const playSfx = useSound(soundData.eating);

    async function sendChangeScoreNotification() {
        await publish('CHANGE_SCORE', 15);
    }

    useGameObjectEvent<TriggerEvent>('trigger', other => {
        if (other.name === 'player') {
            // TODO: signal score loss
            sendChangeScoreNotification();
            getRef().setDisabled(true);
            playSfx();
        }
    });

    return null;
}

export default function Bat(props: GameObjectProps) {
    return (
        <GameObject layer="obstacle" {...props}>
            <Collider isTrigger />
            <Moveable />
            <Sprite {...spriteData.bat} offset={{ x: 0, y: 0 }} basic />
            <RunningAwayScript reactionSpeed={500} />
            <TriggerScript />
        </GameObject>
    );
}
