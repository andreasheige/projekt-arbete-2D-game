import React from 'react';
import * as THREE from 'three';
import Collider from '../@core/Collider';
import GameObject, { GameObjectProps } from '../@core/GameObject';
import Sprite from '../@core/Sprite';
import spriteData from '../spriteData';

export default function Mal(props: GameObjectProps) {
    const lightTarget = new THREE.Mesh();
    return (
        <GameObject layer="obstacle" {...props}>
            <Collider />
            <Sprite {...spriteData.mal} offset={{ x: 0, y: 0 }} />
            <primitive object={lightTarget} position={[0, 0, 1.5]} />
            <spotLight
                position={[0, 0, 4.5]}
                angle={0.25}
                penumbra={1}
                target={lightTarget}
                intensity={0.2}
            />
        </GameObject>
    );
}
