import React from 'react';
import Collider, { TriggerEvent } from '../@core/Collider';
import GameObject, { GameObjectProps } from '../@core/GameObject';
import Sprite from '../@core/Sprite';
import spriteData from '../spriteData';
import useGameObjectEvent from '../@core/useGameObjectEvent';
import ScoreScriptGhost from '../components/ScoreScriptGhost';

function TriggerScript() {
    // const playSfx = useSound(soundData.eating);
    useGameObjectEvent<TriggerEvent>('trigger', other => {
        if (other.name === 'followingRat') {
            // playSfx();
            other.setDisabled(true); // will cause warning
        }
    });

    return null;
}

export default function BlackHole(props: GameObjectProps) {
    return (
        <GameObject name="blackhole" layer="character" {...props}>
            <Collider isTrigger />
            <Sprite {...spriteData.objects} state="blackhole" offset={{ x: 0, y: 0.25 }} />
            <TriggerScript />
        </GameObject>
    );
}