import React, { Fragment, useState } from 'react';
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
import Plant from '../entities/Plant';
import Tree from '../entities/Tree';
import Mush35 from '../entities/Mushrooms/Mush35';
import Mush33 from '../entities/Mushrooms/Mush33';
import Mush19 from '../entities/Mushrooms/Mush19';
import Mush18 from '../entities/Mushrooms/Mush18';
import Mush16 from '../entities/Mushrooms/Mush16';
import Mush13 from '../entities/Mushrooms/Mush13';
import Mush06 from '../entities/Mushrooms/Mush06';
import spriteData from '../spriteData';
import getRoomData from './sceen_data/gardenData';
import IntoText from '../components/IntoText';

const floorChar = '·';
const mushroom = 't';
const chanceOrRubbish = 0;
const mapData = insertRandomMarks(
    mapDataString(getRoomData()),
    floorChar,
    chanceOrRubbish,
    mushroom
);
insertNRandomMarks(mapData, '·', 2, 'a');
insertNRandomMarks(mapData, '·', 2, 'b');
insertNRandomMarks(mapData, '·', 2, 'c');
insertNRandomMarks(mapData, '·', 2, 'd');
insertNRandomMarks(mapData, '·', 2, 'e');
insertNRandomMarks(mapData, '·', 2, 'f');
insertNRandomMarks(mapData, '·', 2, 'g');
insertNRandomMarks(mapData, '·', 33, 't');
insertNRandomMarks(mapData, '·', 33, 'l');
insertNRandomMarks(mapData, '·', 33, 'p');

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
                    <Sprite {...spriteData.bush} />
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

        case 'a':
            return (
                <Fragment key={key}>
                    {floor}
                    <Mush33 {...position} />
                </Fragment>
            );
        case 'b':
            return (
                <Fragment key={key}>
                    {floor}
                    <Mush13 {...position} />
                </Fragment>
            );
        case 'c':
            return (
                <Fragment key={key}>
                    {floor}
                    <Mush35 {...position} />
                </Fragment>
            );
        case 'd':
            return (
                <Fragment key={key}>
                    {floor}
                    <Mush19 {...position} />
                </Fragment>
            );
        case 'e':
            return (
                <Fragment key={key}>
                    {floor}
                    <Mush18 {...position} />
                </Fragment>
            );
        case 'f':
            return (
                <Fragment key={key}>
                    {floor}
                    <Mush16 {...position} />
                </Fragment>
            );
        case 'g':
            return (
                <Fragment key={key}>
                    {floor}
                    <Mush06 {...position} />
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
        case 'l':
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

const startPos = { x: 31, y: 11 }; // { x: 13, y: 12 };

export default function GardenSceen() {
    const [displayIntroText, setDisplayIntroText] = useState(true);
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
            {displayIntroText && (
                <IntoText setDisplayIntroText={setDisplayIntroText} startPos={startPos}>
                    <div>
                        <p />
                        <p>Rummets uppdrag:</p>
                        <p>Text kommer...</p>
                    </div>
                </IntoText>
            )}
            <Player {...startPos} />
        </>
    );
}
