import React, { useCallback, useRef, useState } from 'react';
import Collider, { TriggerEvent } from '../@core/Collider';
import GameObject, { GameObjectProps } from '../@core/GameObject';
import { useSound } from '../@core/Sound';
import Sprite, { SpriteRef } from '../@core/Sprite';
import useGameObject from '../@core/useGameObject';
import useGameObjectEvent from '../@core/useGameObjectEvent';
import soundData from '../soundData';
import spriteData from '../spriteData';
import useGame from '../@core/useGame';
import { KEY_TO_STUDY_FOUND } from '../constants/gameStates';
import useGameLoop from '../@core/useGameLoop';
import { OPEN_DOOR } from '../constants/events';

function DisableOnTriggerScript({ onStepOnkey }) {
    const { getRef, getComponent } = useGameObject();
    const { publish } = useGame();
    const playSfx = useSound(soundData.eating);
    const { setGameState } = useGame();
    async function sendOpenDoorNotification() {
        await publish(OPEN_DOOR, {});
    }
    useGameObjectEvent<TriggerEvent>('trigger', other => {
        if (other.name === 'player') {
            playSfx();
            setGameState(KEY_TO_STUDY_FOUND, true);
            sendOpenDoorNotification();
            getComponent<SpriteRef>('Sprite').setOpacity(1.0);
            onStepOnkey(getRef());
        }
    });

    return null;
}

export default function Key(props: GameObjectProps) {
    const name = `key-from-study-to-kitchen`;
    const childRef = useRef<THREE.Group>();
    const scaleRef = useRef<THREE.Group>();
    const scaleFirst = useRef<THREE.Vector3>();
    const time0 = useRef(0);
    const [hitKey, setHitKey] = useState(false);
    const rotate = useCallback(time => {
        childRef.current.rotation.set(0, 0, 0.005 * time);
    }, []);
    const scaleUp = useCallback(time => {
        if (time0.current === 0) time0.current = time;
        const timeDiff = time - time0.current;
        const scaleFactor = 1.0 + 0.00007 * timeDiff;
        scaleRef.current.scale.setY(scaleFirst.current.x * scaleFactor);
        scaleRef.current.scale.setX(scaleFirst.current.x * scaleFactor);
    }, []);

    function handleStepOnkey(ref) {
        setHitKey(true);
        scaleFirst.current = scaleRef.current.scale;
        setTimeout(() => {
            ref.setDisabled(true);
        }, 1000);
    }

    useGameLoop(time => {
        if (childRef.current) rotate(time);
        if (hitKey && scaleRef.current) scaleUp(time);
    });
    return (
        <GameObject name={name} persisted {...props}>
            <group ref={childRef}>
                <group ref={scaleRef}>
                    <Sprite {...spriteData.objects} opacity={0} state="pizza" />
                </group>
            </group>
            <Collider isTrigger />
            <DisableOnTriggerScript onStepOnkey={handleStepOnkey} />
        </GameObject>
    );
}
