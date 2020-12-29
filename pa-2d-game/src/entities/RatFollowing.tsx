import React, { useState } from 'react';
import CharacterScript from '../components/CharacterScript';
import Collider from '../@core/Collider';
import GameObject, { GameObjectProps } from '../@core/GameObject';
import Sprite from '../@core/Sprite';
import spriteData from '../spriteData';
import FollowScript from '../components/FollowScript';
import Moveable from '../@core/Moveable';

export default function FollowingRat(props: GameObjectProps) {
    const [isEaten, setEaten] = useState(false);
    return (
        <GameObject layer="item" {...props}>
            <Collider />
            <Moveable />
            <CharacterScript>
                <Sprite {...spriteData.rat} state="rat" />
            </CharacterScript>
            <FollowScript reactionSpeed={1000} isEaten={isEaten} />
        </GameObject>
    );
}
