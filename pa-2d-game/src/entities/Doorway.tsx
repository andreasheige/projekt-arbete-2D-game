import React from 'react';
import Collider from '../@core/Collider';
import GameObject, { GameObjectProps } from '../@core/GameObject';
import Sprite from '../@core/Sprite';
import spriteData from '../spriteData';

interface GatewayBlockProps extends GameObjectProps {
    direction?: string;
}

export default function Doorway(props: GatewayBlockProps) {
    // TODO add 'up' if needed. 'Right' is default
    const offSet = { x: 0.08, y: 0 };
    return (
        <GameObject layer="obstacle" {...props}>
            <Collider />
            <Sprite {...spriteData.doorway01} offset={offSet} />
        </GameObject>
    );
}
