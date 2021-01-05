import React, { Fragment } from 'react';
import Collider from '../@core/Collider';
import GameObject from '../@core/GameObject';
import Interactable from '../@core/Interactable';
import ScenePortal from '../@core/ScenePortal';
import Sprite from '../@core/Sprite';
import TileMap, { TileMapResolver } from '../@core/TileMap';
import {
    mapDataString,
    insertRandomMarks,
    insertNRandomMarks,
} from '../@core/utils/mapUtils';
import Player from '../entities/Player';
import Pine from '../entities/Pine';
import Tree from '../entities/Tree';
import Mush00 from '../entities/Mushrooms/Mush00';
import Mush01 from '../entities/Mushrooms/Mush01';
import spriteData from '../spriteData';
import getRoomData from './sceen_data/gardenData';

const floorChar = '·';
const pine = 'p';
const chanceOrRubbish = 0.5;
const mapData = insertRandomMarks(
    mapDataString(getRoomData()),
    floorChar,
    chanceOrRubbish,
    pine
);
insertNRandomMarks(mapData, '·', 3, 'm');
insertNRandomMarks(mapData, '·', 3, 'n');
insertNRandomMarks(mapData, '·', 33, 't');

const resolveMapTile: TileMapResolver = (type, x, y) => {
    const key = `${x}-${y}`;
    const position = { x, y };

    const floor = (
        <GameObject key={key} {...position} layer="ground">
            <Sprite {...spriteData.objects} state="grass" />
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
        case '0':
            return (
                <GameObject key={key} {...position} layer="wall">
                    <Collider />
                    <Sprite {...spriteData.objects} state="roof" />
                </GameObject>
            );
        case '1':
            return (
                <GameObject key={key} {...position} layer="wall">
                    <Collider />
                    <Sprite {...spriteData.objects} state="roof2" />
                </GameObject>
            );
        case '*':
            return (
                <GameObject key={key} {...position} layer="ground">
                    <Sprite {...spriteData.objects} state="floor2" />
                </GameObject>
            );
        case 'm':
            return (
                <Fragment key={key}>
                    {floor}
                    <Mush00 {...position} />
                </Fragment>
            );
        case 'n':
            return (
                <Fragment key={key}>
                    {floor}
                    <Mush01 {...position} />
                </Fragment>
            );
        case 'p':
            return (
                <Fragment key={key}>
                    {floor}
                    <Pine {...position} />
                </Fragment>
            );
        case 't':
            return (
                <Fragment key={key}>
                    {floor}
                    <Tree {...position} />
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
            <GameObject x={13} y={12}>
                <ScenePortal
                    name="start"
                    enterDirection={[-1, 0]}
                    target="kitchen/exit"
                />
            </GameObject>
            <GameObject x={20} y={11}>
                <Collider />
                <Interactable />
                <ScenePortal
                    name="exit"
                    enterDirection={[0, 1]}
                    target="hallway/entrance"
                />
            </GameObject>
            <Player x={13} y={12} />
        </>
    );
}
