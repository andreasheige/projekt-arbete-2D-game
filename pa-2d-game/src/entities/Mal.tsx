import React, { useState } from 'react';
import * as THREE from 'three';
import Collider, { TriggerEvent } from '../@core/Collider';
import GameObject, { GameObjectProps } from '../@core/GameObject';
import Sprite from '../@core/Sprite';
import spriteData from '../spriteData';
import RunningAwayScript from '../components/RunningAwayScript';
import Moveable from '../@core/Moveable';
import useGameObjectEvent from '../@core/useGameObjectEvent';
import useGameObject from '../@core/useGameObject';
import { useSound } from '../@core/Sound';
import soundData from '../soundData';
import ScoreScript from '../components/ScoreScript';
import useGameEvent from '../@core/useGameEvent';
import { POWERBUTTON_ACTIVATION_EVENT } from '../constants/events';

function TriggerScript({ isEaten, setEaten }) {
    const { getRef } = useGameObject();
    const playSfx = useSound(soundData.eating);

    useGameObjectEvent<TriggerEvent>('trigger', other => {
        if (isEaten) return;
        if (other.name === 'player') {
            setTimeout(() => {
                getRef().setDisabled(true);
            }, 2000);
            setEaten(true);
            playSfx();
        }
    });

    useGameEvent(
        POWERBUTTON_ACTIVATION_EVENT,
        () => {
            getRef().setDisabled(true);
        },
        []
    );

    return null;
}

export default function Mal(props: GameObjectProps) {
    const lightTarget = new THREE.Mesh();
    const [isEaten, setEaten] = useState(false);
    return (
        <GameObject layer="obstacle" {...props}>
            {!isEaten && <Collider isTrigger />}
            <Moveable />
            <primitive object={lightTarget} position={[0, 0, 1.5]} />
            <RunningAwayScript reactionSpeed={1000} isEaten={isEaten} />
            {!isEaten && (
                <spotLight
                    position={[0, 0, 4.5]}
                    angle={0.25}
                    penumbra={1}
                    target={lightTarget}
                    intensity={0.2}
                />
            )}
            {!isEaten && <Sprite {...spriteData.mal} offset={{ x: 0, y: 0 }} basic />}
            <TriggerScript setEaten={setEaten} isEaten={isEaten} />
            <ScoreScript scoreChange={10} />
        </GameObject>
    );
}
