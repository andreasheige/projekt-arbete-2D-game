import React from 'react';
import Collider from '../../@core/Collider';
import GameObject, { GameObjectProps } from '../../@core/GameObject';
import Sprite from '../../@core/Sprite';
import spriteData from '../../spriteData';
import EatFoodScript from '../../components/EatFoodScript';

export default function Watermelon(props: GameObjectProps) {
    const name = `watermelon-${props.x}-${props.y}`; // fallback name required for persisted flag
    return (
        <GameObject name={name} persisted {...props}>
            <Sprite {...spriteData.food} state="watermelon" />
            <Collider isTrigger />
            <EatFoodScript foodType="m" />
        </GameObject>
    );
}
