import React from 'react';
import Collider, { TriggerEvent } from '../../@core/Collider';
import GameObject, { GameObjectProps } from '../../@core/GameObject';
import spriteData from '../../spriteData';
import { useSound } from '../../@core/Sound';
import Sprite from '../../@core/Sprite';
import useGameObject from '../../@core/useGameObject';
import useGameObjectEvent from '../../@core/useGameObjectEvent';
import soundData from '../../soundData';
import ScoreScript from '../../components/ScoreScript';

function DisableOnTriggerScript() {
    const { getRef } = useGameObject();
    const playSfx = useSound(soundData.eating);

    useGameObjectEvent<TriggerEvent>('trigger', other => {
        if (other.name === 'player') {
            getRef().setDisabled(true);
            playSfx();
        }
    });

    return null;
}

export default function Mush33(props: GameObjectProps) {
    const name = `mush33-${props.x}-${props.y}`; // fallback name required for persisted flag
    return (
        <GameObject name={name} persisted {...props}>
            <Sprite {...spriteData.mushrooms} state="mush33" />
            <Collider isTrigger />
            <ScoreScript scoreChange={10} />
            <DisableOnTriggerScript />
        </GameObject>
    );
}
