import React from 'react';
import Collider from '../@core/Collider';
import GameObject, { GameObjectProps } from '../@core/GameObject';
import Sprite from '../@core/Sprite';
import spriteData from '../spriteData';

interface GatewayBlockProps extends GameObjectProps {
    direction?: string;
}

export default function GatewayBlock(props: GatewayBlockProps) {
    // TODO add 'up' if needed. 'Right' is default
    const offSet = props.direction === 'left' ? { x: -0.25, y: 0 } : { x: 0.25, y: 0 };
    return (
        <GameObject layer="obstacle" {...props}>
            <Collider />
            <Sprite {...spriteData.objects} state="wall4" offset={offSet} />
        </GameObject>
    );
}
