import React from 'react';
import * as THREE from 'three';
import Collider from '../@core/Collider';
import GameObject, { GameObjectProps } from '../@core/GameObject';
import Interactable from '../@core/Interactable';
import Moveable from '../@core/Moveable';
import Sprite from '../@core/Sprite';
import CameraFollowScript from '../components/CameraFollowScript';
import CharacterScript from '../components/CharacterScript';
import PlayerScript from '../components/PlayerScript';
import spriteData from '../spriteData';

export default function Player(props: GameObjectProps) {
    const lightTarget = new THREE.Mesh();
    return (
        <GameObject name="player" displayName="Player" layer="character" {...props}>
            <Moveable />
            <Interactable />
            <Collider />
            <CharacterScript>
                <Sprite {...spriteData.player} />
            </CharacterScript>
            <primitive object={lightTarget} position={[0, 0, 1.5]} />
            <spotLight
                position={[0, 0, 4.5]}
                angle={0.35}
                penumbra={1}
                target={lightTarget}
            />
            <CameraFollowScript />
            <PlayerScript />
        </GameObject>
    );
}
