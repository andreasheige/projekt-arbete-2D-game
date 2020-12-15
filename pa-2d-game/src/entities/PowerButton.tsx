import React, { useContext } from 'react';
import Collider, { TriggerEvent } from '../@core/Collider';
import GameObject, { GameObjectProps } from '../@core/GameObject';
import Sprite from '../@core/Sprite';
import useGameObjectEvent from '../@core/useGameObjectEvent';
import spriteData from '../spriteData';
import useGame from '../@core/useGame';
import { POWERBUTTON_ACTIVATION_EVENT, CHANGE_SCORE } from '../constants/events';
import { LIGHT_ACTIVE_ROOM1 } from '../constants/gameStates';
import { GameContext } from '../@core/Game';
import { useSound } from '../@core/Sound';
import soundData from '../soundData';
import { TURNING_ON_LIGHT } from '../constants/points';

function TriggerScript() {
    const { publish } = useGame();
    const { setGameState } = useContext(GameContext);
    const playSfx = useSound(soundData.eating);
    async function sendPowerbuttonNotification() {
        await publish(POWERBUTTON_ACTIVATION_EVENT, {});
        await publish(CHANGE_SCORE, TURNING_ON_LIGHT);
    }

    useGameObjectEvent<TriggerEvent>('trigger', other => {
        if (other.name === 'player') {
            setGameState(LIGHT_ACTIVE_ROOM1, true);
            sendPowerbuttonNotification();
            playSfx();
        }
    });

    return null;
}

export default function PowerButton(props: GameObjectProps) {
    const { getGameState } = useContext(GameContext);
    const isLightActive = getGameState(LIGHT_ACTIVE_ROOM1);
    return (
        <GameObject layer="obstacle" {...props}>
            <Collider isTrigger />
            <Sprite
                {...spriteData.objects}
                state="redbutton"
                offset={{ x: 0, y: 0.25 }}
            />
            {!isLightActive && <TriggerScript />}
        </GameObject>
    );
}
