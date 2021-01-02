import React from 'react';
import Collider from '../../@core/Collider';
import GameObject, { GameObjectProps } from '../../@core/GameObject';
import Sprite from '../../@core/Sprite';
import spriteData from '../../spriteData';
import EatFoodScript from '../../components/EatFoodScript';

export default function Mush29(props: GameObjectProps) {
    const name = `mush29-${props.x}-${props.y}`; // fallback name required for persisted flag
    return (
        <GameObject name={name} persisted {...props}>
            <Sprite {...spriteData.mushrooms} state="mush29" />
            <Collider isTrigger />
            <EatFoodScript foodType="a" />
        </GameObject>
    );
}
