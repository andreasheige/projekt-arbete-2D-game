import React, { Fragment, useState } from 'react';
import Collider from '../@core/Collider';
import GameObject from '../@core/GameObject';
import Interactable from '../@core/Interactable';
import ScenePortal from '../@core/ScenePortal';
import Sprite from '../@core/Sprite';
import TileMap, { TileMapResolver } from '../@core/TileMap';
import { mapDataString } from '../@core/utils/mapUtils';
import PizzaPickup from '../entities/PizzaPickup';
import Plant from '../entities/Plant';
import Player from '../entities/Player';
import Ghost from '../entities/Ghost';
import spriteData from '../spriteData';
import Rat from '../entities/Rat';
import RatFollowing from '../entities/RatFollowing';
import IntoText from '../components/IntoText';
import NextSceneScript from '../components/NextSceneScript';
import LosingScoreScript from '../components/LosingScoreScript';

const mapData = mapDataString(`
# # # # # # # # # # # # · # # # #
# · · · · · · · · · · · · · · · #
# · · · · · · · R · · · · · · · #
# · · · G · · · · · · · · · · · #
# · · · · · · · · · · · · · · · ·
# · · · · · · · · · · · · · · · #
# · · · · · · · · · · · · · · · #
# # # # # # # # # # # # # # # # #
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
        case 'G':
            return (
                <Fragment key={key}>
                    {floor}
                    <Ghost {...position} />
                </Fragment>
            );
        case 'R':
            return (
                <Fragment key={key}>
                    {floor}
                    <Rat {...position} />
                </Fragment>
            );
        default:
            return null;
    }
};

const startPos = { x: 15, y: 3 };

export default function LivingroomSceen() {
    const [displayIntroText, setDisplayIntroText] = useState(true);
    return (
        <>
            <GameObject name="map">
                <ambientLight />
                <TileMap data={mapData} resolver={resolveMapTile} definesMapSize />
            </GameObject>
            <LosingScoreScript {...startPos} />
            <GameObject x={16} y={3}>
                <ScenePortal
                    name="start"
                    enterDirection={[-1, 0]}
                    target="hallway/exit"
                />
            </GameObject>
            <GameObject x={12} y={7}>
                <Collider />
                <Interactable />
                <ScenePortal
                    name="exit"
                    enterDirection={[0, 1]}
                    target="study/entrance"
                />
                <NextSceneScript />
            </GameObject>
            <Player x={6} y={3} />
            <RatFollowing x={3} y={2} />
            <RatFollowing x={4} y={5} />
            {displayIntroText && (
                <IntoText setDisplayIntroText={setDisplayIntroText} startPos={startPos}>
                    <div>
                        <p>Rummet går att skippa.</p>
                        <p>Går att fånga en av råttorna.</p>
                        <p>Går att leda 2 råttor till spöket.</p>
                    </div>
                </IntoText>
            )}
        </>
    );
}
