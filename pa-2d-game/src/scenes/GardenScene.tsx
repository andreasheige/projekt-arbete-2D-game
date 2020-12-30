import React, { Fragment } from 'react';
import Collider from '../@core/Collider';
import GameObject from '../@core/GameObject';
import Interactable from '../@core/Interactable';
import ScenePortal from '../@core/ScenePortal';
import Sprite from '../@core/Sprite';
import TileMap, { TileMapResolver } from '../@core/TileMap';
import { mapDataString } from '../@core/utils/mapUtils';
import Plant from '../entities/Plant';
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
# · · · · · · · · · · · · # · # · · · · · · · · · · · · · · · #
# · · · · · · · · · · · · # # # ·  · · · · · · · · · · · · · ·#
# · · · · · · · · · · · · # # # · · · · · · · · · · · · · · · #
# · · · · · · · · · · · · # # # # # # # # · · · · · · · · · · #
# · · · · · · · · · · · · # # # # # # # # · · · · · · · · · · #
# · · · · · · · · · · · · · · · · · # # # · · · · · · · · · · #
# · · · · · · · · · · · · · · · · · # # # · · · · · · · · · · #
# · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · #
# · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · #
# · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · #
# · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · #
# · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · #
# · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · #
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # 
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
        case 'T':
            return (
                <Fragment key={key}>
                    {floor}
                    <Plant {...position} />
                </Fragment>
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
            <GameObject x={16} y={3}>
                <Collider />
                <Interactable />
                <ScenePortal
                    name="start"
                    enterDirection={[-1, 0]}
                    target="kitchen/exit"
                />
            </GameObject>
            <GameObject x={12} y={7}>
                <Collider />
                <Interactable />
            </GameObject>
            <Player x={6} y={3} />
        </>
    );
}
