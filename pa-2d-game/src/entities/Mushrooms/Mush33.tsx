import React from 'react';
import Collider from '../../@core/Collider';
import GameObject, { GameObjectProps } from '../../@core/GameObject';
import Sprite from '../../@core/Sprite';
import spriteData from '../../spriteData';
import EatFoodScript from '../../components/EatFoodScript';

export default function Mush33(props: GameObjectProps) {
    const name = `mush33-${props.x}-${props.y}`; // fallback name required for persisted flag
    return (
        <GameObject name={name} persisted {...props}>
            <Sprite {...spriteData.mushrooms} state="mush33" />
            <Collider isTrigger />
            <EatFoodScript foodType="a" />
        </GameObject>
    );
}
