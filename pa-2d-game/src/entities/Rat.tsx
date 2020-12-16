import React from 'react';
import CharacterScript from '../components/CharacterScript';
import Collider from '../@core/Collider';
import GameObject, { GameObjectProps } from '../@core/GameObject';
import Sprite from '../@core/Sprite';
import spriteData from '../spriteData';

export default function Rat(props: GameObjectProps) {
    return (
        <GameObject layer="item" {...props}>
            <Collider />
            <CharacterScript>
                <Sprite {...spriteData.rat} state="rat" />
            </CharacterScript>
        </GameObject>
    );
}
