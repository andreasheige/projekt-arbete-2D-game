import React, { useState } from 'react';
import tileUtils from '../@core/utils/tileUtils';
import Collider from '../@core/Collider';
import GameObject, { GameObjectProps } from '../@core/GameObject';
import Sprite from '../@core/Sprite';
import spriteData from '../spriteData';
import useGameObject from '../@core/useGameObject';
import Moveable, { MoveableRef } from '../@core/Moveable';
import useGameLoop from '../@core/useGameLoop';
import useCollisionTest from '../@core/useCollisionTest';
import CharacterScript from '../components/CharacterScript';

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

export default function Rat(props: GameObjectProps) {
    return (
        <GameObject layer="obstacle" {...props}>
            <Collider isTrigger />
            <Moveable />
            <CharacterScript>
                <Sprite {...spriteData.rat} state="rat" />
            </CharacterScript>
            <RatScript />
        </GameObject>
    );
}
