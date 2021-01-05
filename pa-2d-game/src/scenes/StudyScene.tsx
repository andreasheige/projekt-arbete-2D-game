import React, { Fragment, useState } from 'react';
import Collider from '../@core/Collider';
import GameObject from '../@core/GameObject';
import Interactable, { InteractionEvent } from '../@core/Interactable';
import ScenePortal from '../@core/ScenePortal';
import Sprite from '../@core/Sprite';
import TileMap, { TileMapResolver } from '../@core/TileMap';
import { mapDataString, insertRandomMarks } from '../@core/utils/mapUtils';
import Player from '../entities/Player';
import spriteData from '../spriteData';
import MovableRubbish from '../entities/MovableRubbish';
import GatewayBlock from '../entities/GatewayBlock';
import useGame from '../@core/useGame';
import useGameEvent from '../@core/useGameEvent';
import { OPEN_DOOR } from '../constants/events';
import {
    KEY_TO_STUDY_FOUND,
    TRIEGGED_CLUE_ORDER,
    CLEANING_EQUIPPED,
} from '../constants/gameStates';
import CleaningBucket from '../entities/CleaningBucket';
import IntoText from '../components/IntoText';
import Cluess from '../components/Clues';
import NextSceneScript from '../components/NextSceneScript';
import useGameObjectEvent from '../@core/useGameObjectEvent';
import LosingScoreScript from '../components/LosingScoreScript';

const floorChar = '·';
const rubbishChar = 'r';
const chanceOrRubbish = 0.5;
const mapData = insertRandomMarks(
    mapDataString(`
# # # # # # # # # # # # # # # # #
# · · · · · · · · · · · · · · · #
# · · · · · · · · · · · * · · · #
# · · · · · · · · · · · * · · · #
# · · · · · · · · · · * * * · * *
# · · · · · · · · * · · * · · · #
# · · · · · · · · · · * * * · · #
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
        case '#':
            return (
                <GameObject key={key} {...position} layer="wall">
                    <Collider />
                    <Sprite {...spriteData.objects} state="wall4" />
                </GameObject>
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
                setGameState(KEY_TO_STUDY_FOUND, false);
                setGameState(TRIEGGED_CLUE_ORDER, 0);
                setGameState(CLEANING_EQUIPPED, false);
                console.log('reset scene 3');
            }
    }, []);
    /* eslint-enable */

    return null;
}

const startPos = { x: 12, y: 0 };

export default function StudySceen() {
    const { getGameState } = useGame();
    const isKeyFound = getGameState(KEY_TO_STUDY_FOUND);
    const [isKeyDoorOpen, setKeyDoorOpen] = useState(isKeyFound);
    const [displayIntroText, setDisplayIntroText] = useState(true);
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
            <LosingScoreScript {...startPos} />
            <GameObject x={12} y={0}>
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
                <ResetScreenScript />
                <NextSceneScript />
            </GameObject>
            <Player {...startPos} />
            <CleaningBucket x={13} y={1} />
            {displayIntroText && (
                <IntoText setDisplayIntroText={setDisplayIntroText} startPos={startPos}>
                    <div>
                        <p>Stökigt rum...</p>
                        <p>Hitta 3 ledtrådar leder till nyckel.</p>
                        <p>Säda om du behöver komma fram.</p>
                    </div>
                </IntoText>
            )}
            <Cluess width={17} height={8} x0={12} y0={1} />
        </Fragment>
    );
}
