import React, { Fragment, useState, useContext } from 'react';
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
import CoffeeMachine from '../entities/CoffeeMachine';
import PizzaPickup from '../entities/PizzaPickup';
import Plant from '../entities/Plant';
import Rubbish from '../entities/Rubbish';
import PowerButton from '../entities/PowerButton';
import Player from '../entities/Player';
import Workstation from '../entities/Workstation';
import GatewayBlock from '../entities/GatewayBlock';
import spriteData from '../spriteData';
import { GameContext } from '../@core/Game';
import useGameEvent from '../@core/useGameEvent';
import { POWERBUTTON_ACTIVATION_EVENT } from '../constants/events';
import { LIGHT_ACTIVE_ROOM1 } from '../constants/gameStates';
import { spritePosToFloor4x4 } from '../@core/utils/tileLoadingUtils';
import Mal from '../entities/Mal';
import IntoText from '../components/IntoText';

const floorChar = '·';
const rubbishChar = 'r';
const chanceOrRubbish = 0.5;
const mapData = insertRandomMarks(
    mapDataString(`
# # # # # # # # # # # # # # # # #
# · * * * · · · · p · · · · · · #
# · * · * * · · · * · · · · · · #
* * * · · * · * * * * * * * * · #
# · · · · * · * · · · · · · * · #
# · · · · * * * · * * * * * * · #
# · · · · · · · · * * · · · · · #
# # # # # # # # # * # # # # # # #
`),
    floorChar,
    chanceOrRubbish,
    rubbishChar
);
insertNRandomMarks(mapData, '*', 3, 'm');

const resolveMapTile: TileMapResolver = (type, x, y) => {
    const key = `${x}-${y}`;
    const position = { x, y };

    const floor = (
        <GameObject key={key} {...position} layer="ground">
            <Sprite {...spriteData.moreFloor} state={spritePosToFloor4x4(x, y)} />
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
        case 'm':
            return (
                <Fragment key={key}>
                    {floor}
                    <Mal {...position} />
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

const startPos = { x: 9, y: 0 };

export default function HallwayScene() {
    const { getGameState } = useContext(GameContext);
    const isLightActiveAndDoorOpened = getGameState(LIGHT_ACTIVE_ROOM1); // inital state is false
    const [isSpotlightActive, setSpotlightActive] = useState(!isLightActiveAndDoorOpened);
    const [displayIntroText, setDisplayIntroText] = useState(true);

    useGameEvent(
        POWERBUTTON_ACTIVATION_EVENT,
        () => {
            setSpotlightActive(false);
        },
        [setSpotlightActive]
    );

    return (
        <>
            <GameObject name="map">
                {isLightActiveAndDoorOpened && <ambientLight />}
                <TileMap data={mapData} resolver={resolveMapTile} definesMapSize />
            </GameObject>
            {!isLightActiveAndDoorOpened && <GatewayBlock x={0} y={4} direction="left" />}
            <GameObject x={0} y={4}>
                <Collider />
                <Interactable />
                {isLightActiveAndDoorOpened && (
                    <ScenePortal
                        name="exit"
                        enterDirection={[1, 0]}
                        target="livingroom/start"
                    />
                )}
            </GameObject>
            <Player {...startPos} spotlight={isSpotlightActive} />
            {displayIntroText && (
                <IntoText setDisplayIntroText={setDisplayIntroText} startPos={startPos}>
                    <div>
                        <p>Ett mörkt stökigt rum...</p>
                        <p>Undvik att trampa på skräpet.</p>
                        <p>Tänd ljuset genom att gå på ljusknappen.</p>
                        <p>Att fånga malarna i rummet ger extra poäng.</p>
                    </div>
                </IntoText>
            )}
        </>
    );
}
