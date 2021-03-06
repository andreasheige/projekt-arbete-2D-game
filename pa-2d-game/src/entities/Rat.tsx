import React, { useState, useRef } from 'react';
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
import RatMoveScript from '../components/RatMoveScript';
import { useSound } from '../@core/Sound';
import soundData from '../soundData';

// prettier-ignore
function RatScript() {
    const { getComponent, transform } = useGameObject();
    const [lastActTime, setLastActTime] = useState(new Date().getTime());
    const previousDirection = useRef(0);

    let RatX = 0;
    let RatY = 0;

    useGameLoop(() => {
        let RatMove = Math.floor(Math.random() * Math.floor(6));
        const now = new Date().getTime();
    
        if (now - lastActTime < 100) return;

        if (RatMove > 3) RatMove = previousDirection.current;

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

        previousDirection.current = RatMove;

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
        await publish('CHANGE_SCORE', 30);
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
        <GameObject layer="character" {...props}>
            <Collider isTrigger />
            <Moveable />
            <RatMoveScript>
                <Sprite {...spriteData.rat} state="rat" />
            </RatMoveScript>
            <TriggerScript />
            <RatScript />
        </GameObject>
    );
}
