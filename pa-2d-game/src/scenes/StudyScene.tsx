import React, { Fragment, useState } from 'react';
import Collider from '../@core/Collider';
import GameObject, { Position } from '../@core/GameObject';
import Interactable from '../@core/Interactable';
import ScenePortal from '../@core/ScenePortal';
import Sprite from '../@core/Sprite';
import TileMap, { TileMapResolver } from '../@core/TileMap';
import { mapDataString, insertRandomMarks } from '../@core/utils/mapUtils';
import CoffeeMachine from '../entities/CoffeeMachine';
import PizzaPickup from '../entities/PizzaPickup';
import Plant from '../entities/Plant';
import Player from '../entities/Player';
import Key from '../entities/Key';
import Workstation from '../entities/Workstation';
import spriteData from '../spriteData';
import MovableRubbish from '../entities/MovableRubbish';
import GatewayBlock from '../entities/GatewayBlock';
import useGame from '../@core/useGame';
import useGameEvent from '../@core/useGameEvent';
import { OPEN_DOOR } from '../constants/events';
import { KEY_TO_STUDY_FOUND } from '../constants/gameStates';
import ArrowClue from '../entities/ArrowClue';
import CleaningBucket from '../entities/CleaningBucket';
// import IntoText from '../components/IntoText';

const floorChar = '·';
const rubbishChar = 'r';
const chanceOrRubbish = 0.5;
const mapData = insertRandomMarks(
    mapDataString(`
# # # # # # # # # # # # # # # # #
# · · · · · · · · · · · · · · · #
# · · · · · · · · · · · · · · · #
# · · · · · · · · · · · * · · · #
# · · · · · · · · · · * * * · * *
# · · · · · · · · · · · * · · · #
# · · · · · · · · · · · * * · · #
# # # # # # # # # # # # * # # # #
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
            <Sprite {...spriteData.objects} state="floor4" />
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
                    <MovableRubbish {...position} />
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
                    <Sprite {...spriteData.objects} state="wall4" />
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

// temp solution, should be generatde
const clues: Array<Position> = [
    { x: 12, y: 1 },
    { x: 9, y: 2 },
    { x: 12, y: 5 },
    { x: 12, y: 3 },
];

const startPos = { x: 12, y: 0 };

export default function StudySceen() {
    const { getGameState } = useGame();
    const isKeyFound = getGameState(KEY_TO_STUDY_FOUND);
    const [isKeyDoorOpen, setKeyDoorOpen] = useState(isKeyFound);
    // const [displayIntroText, setDisplayIntroText] = useState(true);
    useGameEvent(
        OPEN_DOOR,
        () => {
            setKeyDoorOpen(true);
        },
        [setKeyDoorOpen]
    );

    return (
        <Fragment>
            <GameObject name="map">
                <ambientLight />
                <TileMap data={mapData} resolver={resolveMapTile} definesMapSize />
            </GameObject>
            <GameObject x={12} y={0}>
                <Collider />
                <Interactable />
                <ScenePortal
                    name="entrance"
                    enterDirection={[0, -1]}
                    target="livingroom/exit"
                />
            </GameObject>
            {!isKeyDoorOpen && <GatewayBlock x={16} y={3} />}
            <GameObject x={16} y={3}>
                <Collider />
                <Interactable />
                {isKeyDoorOpen && (
                    <ScenePortal
                        name="exit"
                        enterDirection={[1, 0]}
                        target="kitchen/entrance"
                    />
                )}
            </GameObject>
            <Key x={12} y={3} />
            <MovableRubbish x={12} y={3} />
            <ArrowClue {...clues[0]} dest={clues[1]} order={1} />
            <MovableRubbish {...clues[1]} />
            <ArrowClue {...clues[1]} dest={clues[2]} order={2} />
            <MovableRubbish {...clues[2]} />
            <ArrowClue {...clues[2]} dest={clues[3]} order={3} />
            <Player {...startPos} />
            <CleaningBucket x={13} y={1} />
            {/* <IntoText setDisplayIntroText={setDisplayIntroText} startPos={startPos}>
                {displayIntroText && (
                    <div>
                        <p>Stökigt rum...</p>
                        <p>Hitta 3 ledtrådar.</p>
                        <p>Säda om du behöver komma fram.</p>
                    </div>
                )}
            </IntoText> */}
        </Fragment>
    );
}
