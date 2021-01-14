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
import { KEY_TO_STUDY_FOUND, TRIEGGED_CLUE_ORDER } from '../constants/gameStates';
import useGameLoop from '../@core/useGameLoop';
import { OPEN_DOOR, CHANGE_SCORE } from '../constants/events';
import { FINDING_KEY_IN_STUDY_SCENE } from '../constants/points';
import useGameEvent from '../@core/useGameEvent';

function DisableOnTriggerScript({ onStepOnkey }) {
    const { getRef, getComponent } = useGameObject();
    const { publish, getGameState } = useGame();
    const playSfx = useSound(soundData.keys);
    const { setGameState } = useGame();
    async function sendOpenDoorNotification() {
        await publish(OPEN_DOOR, {});
        await publish(CHANGE_SCORE, FINDING_KEY_IN_STUDY_SCENE);
        await publish('ACTIVATE_CLUE', 10); // 10 to make sure no clue has this
    }
    useGameObjectEvent<TriggerEvent>('trigger', other => {
        const triggedClueOrder = getGameState('TRIEGGED_CLUE_ORDER');
        if (other.name === 'player' && triggedClueOrder === 3) {
            playSfx();
            setGameState(KEY_TO_STUDY_FOUND, true);
            setGameState(TRIEGGED_CLUE_ORDER, 10);
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
    const [cluesFound, setCluesFound] = useState(false);
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

    useGameEvent(
        'ACTIVATE_CLUE',
        activeClue => {
            if (activeClue === 3) setCluesFound(true);
        },
        []
    );

    useGameLoop(time => {
        if (childRef.current) rotate(time);
        if (hitKey && scaleRef.current) scaleUp(time);
    });
    return (
        <GameObject name={name} persisted {...props}>
            <group ref={childRef}>
                <group ref={scaleRef}>
                    <Sprite {...spriteData.key} opacity={0} />
                </group>
            </group>
            {cluesFound && <Collider isTrigger />}
            <DisableOnTriggerScript onStepOnkey={handleStepOnkey} />
        </GameObject>
    );
}
