import React, { useState } from 'react';
import tileUtils from '../@core/utils/tileUtils';
import Collider, { TriggerEvent } from '../@core/Collider';
import GameObject, { GameObjectProps } from '../@core/GameObject';
import Sprite from '../@core/Sprite';
import spriteData from '../spriteData';
import useGame from '../@core/useGame';
import useGameObject from '../@core/useGameObject';
import useGameObjectEvent from '../@core/useGameObjectEvent';
import Moveable, { MoveableRef } from '../@core/Moveable';
import useGameLoop from '../@core/useGameLoop';
import CharacterScript from '../components/CharacterScript';
import RunningAwayScript from '../components/RunningAwayScript';
import { useSound } from '../@core/Sound';
import soundData from '../soundData';

// prettier-ignore
function RatScript() {
    const { getComponent, transform } = useGameObject();
    const [lastActTime, setLastActTime] = useState(new Date().getTime());

    let RatX = 0;
    let RatY = 0;

    useGameLoop(() => {
        const RatMove = Math.floor(Math.random() * Math.floor(4));
        const now = new Date().getTime();
        if (now - lastActTime < 500) return;

        switch (RatMove) {
            case 0:
                RatX++;
                break;
            case 1:
                RatX--;
                break;
            case 2:
                RatY++;
                break;
            case 3:
                RatY--;
                break;
            default:
                break;
        }

        const direction = {
            x: RatX,
            y: RatY,
        };

        const nextPosition = tileUtils(transform).add(direction);

        setLastActTime(now);
        (async () => {
            await getComponent<MoveableRef>('Moveable')?.move(nextPosition);
        })();
        
    });

    return null;
}

function TriggerScript() {
    const { publish } = useGame();
    const { getRef } = useGameObject();
    const playSfx = useSound(soundData.eating);

    async function sendChangeScoreNotification() {
        await publish('CHANGE_SCORE', 10);
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

export default function Rat(props: GameObjectProps) {
    return (
        <GameObject layer="obstacle" {...props}>
            <Collider isTrigger />
            <Moveable />
            <CharacterScript>
                <Sprite {...spriteData.rat} state="rat" />
            </CharacterScript>
            <RunningAwayScript reactionSpeed={500} />
            <TriggerScript />
        </GameObject>
    );
}
