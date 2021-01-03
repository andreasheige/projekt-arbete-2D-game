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
import Mush02 from '../entities/Mushrooms/Mush02';
import Mush03 from '../entities/Mushrooms/Mush03';
import Mush04 from '../entities/Mushrooms/Mush04';
import Mush05 from '../entities/Mushrooms/Mush05';
import Mush06 from '../entities/Mushrooms/Mush06';
import Mush07 from '../entities/Mushrooms/Mush07';
import Mush08 from '../entities/Mushrooms/Mush08';
import Mush09 from '../entities/Mushrooms/Mush09';
import Mush10 from '../entities/Mushrooms/Mush10';
import Mush11 from '../entities/Mushrooms/Mush11';
import Mush12 from '../entities/Mushrooms/Mush12';
import Mush13 from '../entities/Mushrooms/Mush13';
import Mush14 from '../entities/Mushrooms/Mush14';
import Mush15 from '../entities/Mushrooms/Mush15';
import Mush16 from '../entities/Mushrooms/Mush16';
import Mush17 from '../entities/Mushrooms/Mush17';
import Mush18 from '../entities/Mushrooms/Mush18';
import Mush19 from '../entities/Mushrooms/Mush19';
import Mush20 from '../entities/Mushrooms/Mush20';
import Mush21 from '../entities/Mushrooms/Mush21';
import Mush22 from '../entities/Mushrooms/Mush22';
import Mush23 from '../entities/Mushrooms/Mush23';
import Mush24 from '../entities/Mushrooms/Mush24';
import Mush25 from '../entities/Mushrooms/Mush25';
import Mush26 from '../entities/Mushrooms/Mush26';
import Mush27 from '../entities/Mushrooms/Mush27';
import Mush28 from '../entities/Mushrooms/Mush28';
import Mush29 from '../entities/Mushrooms/Mush29';
import Mush30 from '../entities/Mushrooms/Mush30';
import Mush31 from '../entities/Mushrooms/Mush31';
import Mush32 from '../entities/Mushrooms/Mush32';
import Mush33 from '../entities/Mushrooms/Mush33';
import Mush34 from '../entities/Mushrooms/Mush34';
import Mush35 from '../entities/Mushrooms/Mush35';
import spriteData from '../spriteData';
import getRoomData from './sceen_data/gardenData';

// const mapData = mapDataString(`
// # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
// # · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · #
// # · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · #
// # · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · #
// # · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · #
// # · · · · · · · · · · · · · · · · * * * * * * * · · · · · · · #
// # · · · · · · · · · · · · · · · · * · · · · · * · · · · · · · #
// # · · · · · · · · · · · · · · · # * # · · · · * · · · · · · · #
// # · · · · · · · · · · · · · · · # # # · · · · * · · · · · · · #
// # · · · · · · · · · · · · # # # # # # # # · · * · · · · · · · #
// # · · · · · · · · · · · · # # # # # # # # · · * · · · · · · · #
// # · · · · · · · · · · · · # # # # # # # # · · * · · · · · · · #
// # · · · · · · · · · · · · # # # # # # # # · · * · · · · · · · #
// # · · · · · · · · · · · · · · · # * # · · · · * · · · · · · · #
// # · · · · · · · · · · · · · · · # * # · · · · * · · · · · · · #
// # · · · · · · · · · · · · · · · · * · · · · · * · · · · · · · #
// # · · · · · · · · · · · · · · · · * · · · · · * · · · · · · · #
// # · · · · · · · · · · · · · · · · * * * * * * * · · · · · · · #
// # · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · #
// # · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · #
// # · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · #
// # · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · #
// # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
// `);
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
            <GameObject x={17} y={9}>
                <ScenePortal
                    name="start"
                    enterDirection={[-1, 0]}
                    target="kitchen/exit"
                />
            </GameObject>
            <GameObject x={17} y={15}>
                <Collider />
                <Interactable />
                <ScenePortal
                    name="exit"
                    enterDirection={[0, 1]}
                    target="hallway/entrance"
                />
            </GameObject>
            <Player x={17} y={9} />
        </>
    );
}
