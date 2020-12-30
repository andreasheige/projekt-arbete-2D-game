import React from 'react';
import Collider from '../@core/Collider';
import GameObject from '../@core/GameObject';
import Interactable from '../@core/Interactable';
import ScenePortal from '../@core/ScenePortal';
import Sprite from '../@core/Sprite';
import TileMap, { TileMapResolver } from '../@core/TileMap';
import { mapDataString } from '../@core/utils/mapUtils';
import Player from '../entities/Player';
import spriteData from '../spriteData';

const mapData = mapDataString(`
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # 
# · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · #
# · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · #
# · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · #
# · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · #
# · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · #
# · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · #
# · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · #
# · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · #
# · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · #
# · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · #
# · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · #
# · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · #
# · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · #
# · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · #
# · · · · · · · · · · · · # # # · · · · · · · · · · · · · · · #
# · · · · · · · · · · · · # # # ·  · · · · · · · · · · · · · ·#
# · · · · · · · · · · · · # # # · · · · · · · · · · · · · · · #
# · · · · · · · · · · · · # # # # # # # # · · · · · · · · · · #
# · · · · · · · · · · · · # # # # # # # # · · · · · · · · · · #
# · · · · · · · · · · · · · · · · · # # # · · · · · · · · · · #
# · · · · · · · · · · · · · · · · · # # # · · · · · · · · · · #
# # # # # # # # # # # # # # # # # · # # # · # # # # # # # # # # 
`);

const resolveMapTile: TileMapResolver = (type, x, y) => {
    const key = `${x}-${y}`;
    const position = { x, y };

    const floor = (
        <GameObject key={key} {...position} layer="ground">
            <Sprite {...spriteData.objects} state="floor2" />
        </GameObject>
    );

    switch (type) {
        case '·':
            return floor;
        case '#':
            return (
                <GameObject key={key} {...position} layer="wall">
                    <Collider />
                    <Sprite {...spriteData.objects} state="wall2" />
                </GameObject>
            );
        default:
            return null;
    }
};

export default function GardenSceen() {
    return (
        <>
            <GameObject name="map">
                <ambientLight />
                <TileMap data={mapData} resolver={resolveMapTile} definesMapSize />
            </GameObject>
            <GameObject x={17} y={0}>
                <ScenePortal
                    name="start"
                    enterDirection={[-1, 0]}
                    target="kitchen/exit"
                />
            </GameObject>
            <GameObject x={21} y={0}>
                <Collider />
                <Interactable />
                <ScenePortal
                    name="exit"
                    enterDirection={[0, 1]}
                    target="hallway/entrance"
                />
            </GameObject>
            <Player x={17} y={0} />
        </>
    );
}
