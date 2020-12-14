import React from 'react';
import Collider from '../@core/Collider';
import GameObject, { GameObjectProps } from '../@core/GameObject';
import Sprite from '../@core/Sprite';
import spriteData from '../spriteData';

export default function Ghost(props: GameObjectProps) {
    return (
        <GameObject layer="obstacle" {...props}>
            <Collider />
            <Sprite {...spriteData.objects} state="ghost" offset={{ x: 0, y: 0.25 }} />
        </GameObject>
    );
}
