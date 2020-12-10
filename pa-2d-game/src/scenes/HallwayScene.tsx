import React, { Fragment, useContext } from 'react';
import Collider from '../@core/Collider';
import GameObject from '../@core/GameObject';
import Interactable from '../@core/Interactable';
import ScenePortal from '../@core/ScenePortal';
import Sprite from '../@core/Sprite';
import TileMap, { TileMapResolver } from '../@core/TileMap';
import { mapDataString, insertRandomMarks } from '../@core/utils/mapUtils';
import CoffeeMachine from '../entities/CoffeeMachine';
import PizzaPickup from '../entities/PizzaPickup';
import Plant from '../entities/Plant';
import Rubbish from '../entities/Rubbish';
import PowerButton from '../entities/PowerButton';
import Player from '../entities/Player';
import Workstation from '../entities/Workstation';
import spriteData from '../spriteData';
import GameContext from '../@core/Game';

const floorChar = '·';
const rubbishChar = 'r';
const chanceOrRubbish = 0.5;
const mapData = insertRandomMarks(
    mapDataString(`
# # # # # # # # # # # # # # # # #
# · * * * · · · · · · · · · · · #
# · * · * * · · · * · · · · · · #
* * * · · * · * * * * * * * * · #
# · · · · * · * · · · · · · * · #
# · · · · * * * · p * * * * * · #
# · · · · · · · · * · · · · · · #
# # # # # # # # # * # # # # # # #
`),
    floorChar,
    chanceOrRubbish,
    rubbishChar
);

const resolveMapTile: TileMapResolver = (type, x, y) => {
    const key = `${x}-${y}`;
    const position = { x, y };

    const floor = (
        <GameObject key={key} {...position} layer="ground">
            <Sprite {...spriteData.objects} state="floor1" />
        </GameObject>
    );

    switch (type) {
        case '·':
            return floor;
        case '*':
            return floor;
        case 'r':
            return (
                <Fragment key={key}>
                    {floor}
                    <Rubbish {...position} />
                </Fragment>
            );
        case 'p':
            return (
                <Fragment key={key}>
                    {floor}
                    <PowerButton {...position} />
                </Fragment>
            );
        case 'o':
            return (
                <Fragment key={key}>
                    {floor}
                    <PizzaPickup {...position} />
                </Fragment>
            );
        case '#':
            return (
                <GameObject key={key} {...position} layer="wall">
                    <Collider />
                    <Sprite {...spriteData.objects} state="wall1" />
                </GameObject>
            );
        case 'W':
            return (
                <Fragment key={key}>
                    {floor}
                    <Workstation {...position} />
                </Fragment>
            );
        case 'C':
            return (
                <Fragment key={key}>
                    {floor}
                    <CoffeeMachine {...position} />
                </Fragment>
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

export default function HallwayScene() {
    // console.log(GameContext);
    // const { publish, subscribe } = useContext(GameContext);
    return (
        <>
            <GameObject name="map">
                <ambientLight intensity={0.7} />
                <TileMap data={mapData} resolver={resolveMapTile} definesMapSize />
            </GameObject>
            <GameObject x={0} y={4}>
                <Collider />
                <Interactable />
                <ScenePortal
                    name="exit"
                    enterDirection={[1, 0]}
                    target="livingroom/start"
                />
            </GameObject>
            <Player x={9} y={0} spotlight />
        </>
    );
}
