import React, { useState } from 'react';
import Collider, { TriggerEvent } from '../@core/Collider';
import GameObject, { GameObjectProps } from '../@core/GameObject';
import Sprite from '../@core/Sprite';
import spriteData from '../spriteData';
import useGameObjectEvent from '../@core/useGameObjectEvent';
import ScoreScriptGhost from '../components/ScoreScriptGhost';
import useGame from '../@core/useGame';
import { OPEN_DOOR } from '../constants/events';
import { useSound } from '../@core/Sound';
import soundData from '../soundData';

export const name = 'blackhole';

function TriggerScript() {
    const { publish } = useGame();
    const [numRats, setNumRats] = useState(2);
    const playSfx = useSound(soundData.blipp);

    async function sendNotification() {
        await publish(OPEN_DOOR);
    }

    useGameObjectEvent<TriggerEvent>(
        'trigger',
        other => {
            if (other.name === 'followingRat') {
                playSfx();
                other.setDisabled(true);
                setNumRats(r => r - 1);
                if (numRats === 1) sendNotification();
            }
        },
        [setNumRats, numRats]
    );

    return null;
}

export default function BlackHole(props: GameObjectProps) {
    return (
        <GameObject name="blackhole" layer="character" {...props}>
            <Collider isTrigger />
            <Sprite
                {...spriteData.objects}
                state="blackhole"
                offset={{ x: 0, y: 0.25 }}
            />
            <TriggerScript />
            <ScoreScriptGhost />
        </GameObject>
    );
}
