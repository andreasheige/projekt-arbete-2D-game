import React, { Fragment, useState } from 'react';
import Collider from '../@core/Collider';
import GameObject from '../@core/GameObject';
import ScenePortal from '../@core/ScenePortal';
import Sprite from '../@core/Sprite';
import TileMap, { TileMapResolver } from '../@core/TileMap';
import { mapDataString } from '../@core/utils/mapUtils';
import PizzaPickup from '../entities/PizzaPickup';
import Player from '../entities/Player';
import Ghost from '../entities/Ghost';
import spriteData from '../spriteData';
import Rat from '../entities/Rat';
import BlackHole from '../entities/BlackHole';
import RatFollowing from '../entities/RatFollowing';
import IntoText from '../components/IntoText';
import MovingWall from '../entities/MovingWall';
import NextSceneScript from '../components/NextSceneScript';
import LosingScoreScript from '../components/LosingScoreScript';
import { spritePosToFloor4x4 } from '../@core/utils/tileLoadingUtils';
import Doorway from '../entities/Doorway';

const mapData = mapDataString(`
# # # # # # # # # # # # · # # # #
# · · · · · · · · · · · · · · · #
# · · · · · · · R · · · # · · · #
# · · · B · · · · · · · · · · · #
# · · · · · · · · · · · · · · · ·
# · · · · · · · · · · · # · · · #
# · · · · · · · · · · · · · · · #
# # # # # # # # # # # # # # # # #
`);

const resolveMapTile: TileMapResolver = (type, x, y) => {
    const key = `${x}-${y}`;
    const position = { x, y };

    const floor = (
        <GameObject key={key} {...position} layer="ground">
            <Sprite {...spriteData.floorRatScene} state={spritePosToFloor4x4(x, y)} />
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
                    <Sprite {...spriteData.wallpaper01} />
                </GameObject>
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
        case 'B':
            return (
                <Fragment key={key}>
                    {floor}
                    <BlackHole {...position} />
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
            <Doorway x={12} y={7} collider="always">
                <ScenePortal
                    name="exit"
                    enterDirection={[0, 1]}
                    target="study/entrance"
                />
                <NextSceneScript />
            </Doorway>
            <Player x={6} y={3} />
            <RatFollowing x={3} y={2} />
            <RatFollowing x={4} y={5} />
            <MovingWall x={3} y={5} wallDirection={-1} speed={400} />
            <MovingWall x={5} y={1} wallDirection={1} speed={100} />
            <MovingWall x={7} y={4} wallDirection={-1} speed={200} />
            <MovingWall x={9} y={2} wallDirection={1} speed={300} />
            <MovingWall x={11} y={4} wallDirection={-1} speed={300} />
            <MovingWall x={14} y={4} wallDirection={1} speed={400} />
            {displayIntroText && (
                <IntoText setDisplayIntroText={setDisplayIntroText} startPos={startPos}>
                    <div>
                        <p>Rummets uppdrag:</p>
                        <p>En av råttorna går att fånga.</p>
                        <p>led de andra 2 råttor till svarta hålet,</p>
                        <p>men trilla inte ned själv...</p>
                        <p>Akta dig för spöken de ger minuspoäng</p>
                    </div>
                </IntoText>
            )}
        </>
    );
}
