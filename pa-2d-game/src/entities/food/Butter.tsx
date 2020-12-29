import React from 'react';
import Collider from '../../@core/Collider';
import GameObject, { GameObjectProps } from '../../@core/GameObject';
import Sprite from '../../@core/Sprite';
import spriteData from '../../spriteData';
import EatFoodScript from '../../components/EatFoodScript';

export default function Butter(props: GameObjectProps) {
    const name = `butter-${props.x}-${props.y}`; // fallback name required for persisted flag
    return (
        <GameObject name={name} persisted {...props}>
            <Sprite {...spriteData.food} state="butter" />
            <Collider isTrigger />
            <EatFoodScript foodType="e" />
        </GameObject>
    );
}
