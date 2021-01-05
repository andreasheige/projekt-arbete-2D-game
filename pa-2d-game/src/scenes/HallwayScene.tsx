import React, { Fragment, useState, useContext } from 'react';
import Collider from '../@core/Collider';
import GameObject from '../@core/GameObject';
import Interactable, { InteractionEvent } from '../@core/Interactable';
import ScenePortal from '../@core/ScenePortal';
import Sprite from '../@core/Sprite';
import TileMap, { TileMapResolver } from '../@core/TileMap';
import {
    mapDataString,
    insertRandomMarks,
    insertNRandomMarks,
} from '../@core/utils/mapUtils';
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
import getRoomData from './sceen_data/hallwayData';
import NextSceneScript from '../components/NextSceneScript';
import useGameObjectEvent from '../@core/useGameObjectEvent';
import useGame from '../@core/useGame';

const floorChar = '·';
const rubbishChar = 'r';
const chanceOrRubbish = 0.5;
const mapData = insertRandomMarks(
    mapDataString(getRoomData()),
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

function ResetScreenScript() {
    const { setGameState } = useGame();

    /* eslint-disable */
    useGameObjectEvent<InteractionEvent>('interaction', other => {
            if (other.name === 'player') {
                setGameState(LIGHT_ACTIVE_ROOM1, false);
            }
    }, []);
    /* eslint-enable */

    return null;
}

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
            <GameObject x={9} y={0}>
                <Collider />
                <Interactable />
                <ScenePortal name="start" enterDirection={[1, 0]} target="garden/exit" />
            </GameObject>
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
                <NextSceneScript />
                <ResetScreenScript />
            </GameObject>
            <Player {...startPos} spotlight={isSpotlightActive} />
            {displayIntroText && (
                <IntoText setDisplayIntroText={setDisplayIntroText} startPos={startPos}>
                    <div>
                        <p>Rummets uppdrag:</p>
                        <p>
                            Du skall navigera dig fram mellan växterna för att hitta en
                            rödljus knapp.
                        </p>
                        <p>
                            Undvik att gå på växterna de ger minus poäng. Försök fånga
                            malarna de
                        </p>
                        <p>de ger dig extra poäng..</p>
                        <p>
                            Ljuset måste tändas innan du kan ta dig vidare till nästa
                            rum...
                        </p>
                    </div>
                </IntoText>
            )}
        </>
    );
}
