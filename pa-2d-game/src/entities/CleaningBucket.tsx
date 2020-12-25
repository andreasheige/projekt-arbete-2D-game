import React from 'react';
import Collider, { TriggerEvent } from '../@core/Collider';
import GameObject, { GameObjectProps } from '../@core/GameObject';
import Sprite from '../@core/Sprite';
import spriteData from '../spriteData';
import useGameObjectEvent from '../@core/useGameObjectEvent';
import useGame from '../@core/useGame';
import ScoreScript from '../components/ScoreScript';
import { USE_CLEANING_COST } from '../constants/points';
import { useSound } from '../@core/Sound';
import soundData from '../soundData';

function TriggerScript() {
    const { publish, setGameState } = useGame();
    const playSfx = useSound(soundData.splash);
    async function sendNotification() {
        await publish('CLEANING_EQUIPPED', {});
    }
    useGameObjectEvent<TriggerEvent>('trigger', other => {
        if (other.name === 'player') {
            sendNotification();
            setGameState('CLEANING_EQUIPPED', true);
            playSfx();
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
            <ScoreScript scoreChange={USE_CLEANING_COST} />
        </GameObject>
    );
}
