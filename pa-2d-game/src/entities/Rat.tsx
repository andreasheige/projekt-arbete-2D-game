import React from 'react';
import tileUtils from '../@core/utils/tileUtils';
import Collider from '../@core/Collider';
import GameObject, { GameObjectProps } from '../@core/GameObject';
import Sprite from '../@core/Sprite';
import spriteData from '../spriteData';
import useGameObject from '../@core/useGameObject';
import Movable, { MoveableRef } from '../@core/Moveable';
import useGameLoop from '../@core/useGameLoop';
import useCollisionTest from '../@core/useCollisionTest';
import CharacterScript from '../components/CharacterScript';

// prettier-ignore
function RatScript() {
    const { getComponent, transform } = useGameObject();
    const testCollision = useCollisionTest();

    let RatX = 0;
    let RatY = 0;

    useGameLoop(() => {
        const RatMove = Math.floor(Math.random() * Math.floor(4));
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
            x: RatX / 20,
            y: RatY / 20,
        };

        const nextPosition = tileUtils(transform).add(direction);
        // is same position?
         if (tileUtils(nextPosition).equals(transform)) return;

         // is already moving?
         if (!getComponent<MoveableRef>('Moveable').canMove()) return;

        // will cut corner?
         const horizontal = { ...transform, x: nextPosition.x };
         const vertical = { ...transform, y: nextPosition.y };
         const canCross =
             direction.x !== 0 && direction.y !== 0
                 ? // test diagonal movement
                 testCollision(horizontal) && testCollision(vertical)
                 : true;

        if (canCross) {
            getComponent<MoveableRef>('Moveable')?.move(nextPosition);
        }
    });

    return null;
}

export default function Rat(props: GameObjectProps) {
    return (
        <GameObject layer="obstacle" {...props}>
            <Sprite {...spriteData.rat} state="rat" />
            <Collider isTrigger />
            <RatScript />
            <Movable />
        </GameObject>
    );
}
