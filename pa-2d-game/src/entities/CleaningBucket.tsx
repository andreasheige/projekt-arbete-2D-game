import React, { useState } from 'react';
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
import useGameEvent from '../@core/useGameEvent';
import { CLEANING_EQUIPPED } from '../constants/gameStates';

function TriggerScript({ setPickedUp }) {
    const { publish, setGameState, getGameState } = useGame();
    const playSfx = useSound(soundData.splash);
    async function sendNotification() {
        await publish('CLEANING_EQUIPPED', {});
    }
    useGameObjectEvent<TriggerEvent>('trigger', other => {
        if (other.name === 'player' && !getGameState(CLEANING_EQUIPPED)) {
            sendNotification();
            setGameState(CLEANING_EQUIPPED, true);
            playSfx();
            setPickedUp(true);
        }
    });
    useGameEvent(
        'USE_BUCKET',
        () => {
            setGameState(CLEANING_EQUIPPED, false);
            setPickedUp(false);
        },
        [setPickedUp]
    );
    return null;
}

export default function CleaningBucket(props: GameObjectProps) {
    const [isPickedUp, setPickedUp] = useState(false);
    return (
        <GameObject layer="obstacle" {...props}>
            <Collider isTrigger />
            {!isPickedUp && (
                <Sprite {...spriteData.cleaningBucket} offset={{ x: 0, y: 0.0 }} />
            )}
            <TriggerScript setPickedUp={setPickedUp} />
            <ScoreScript scoreChange={USE_CLEANING_COST} ignoreKey={CLEANING_EQUIPPED} />
        </GameObject>
    );
}
