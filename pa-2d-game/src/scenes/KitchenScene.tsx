import React, { Fragment, useState } from 'react';
import Bat from '../entities/Bat';
import Collider from '../@core/Collider';
import GameObject from '../@core/GameObject';
import Interactable from '../@core/Interactable';
import ScenePortal from '../@core/ScenePortal';
import Sprite from '../@core/Sprite';
import TileMap, { TileMapResolver } from '../@core/TileMap';
import { mapDataString } from '../@core/utils/mapUtils';
import CoffeeMachine from '../entities/CoffeeMachine';
import PizzaPickup from '../entities/PizzaPickup';
import Player from '../entities/Player';
import Refrigerator from '../entities/Refrigerator';
import Apple from '../entities/food/apple';
import Bacon from '../entities/food/bacon';
import Banana from '../entities/food/banana';
import Bread from '../entities/food/bread';
import Butter from '../entities/food/butter';
import Candy from '../entities/food/candy';
import Cheese from '../entities/food/cheese';
import Cucumber from '../entities/food/cucumber';
import Egg from '../entities/food/egg';
import Onion from '../entities/food/onion';
import Sausage from '../entities/food/sausage';
import Tomato from '../entities/food/tomato';
import Watermelon from '../entities/food/watermelon';
import spriteData from '../spriteData';
import IntoText from '../components/IntoText';

const mapData = mapDataString(`
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # · # #
# i · · · · · l · # · · · · C C # # # · · · # · · · # · · · # · · · #
# · · a · B · · · e  f· · · · · # # # · # · # · # · # · # · # # # # #
# · · · · · · # · · · · · # · · · · # · # · # · # · # · # · # · · · #
· · · # · b · c · · · · · · · · # · # · # · # · # · # · # · # · · · #
# · · · · · · d · · g · · · · m # · # · # · # · # · # · # · # · · · #
# j · k · · # · · · · · h · · · # · · · # · · · # · · · # · · · · · #
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # 
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
                    <Sprite {...spriteData.objects} state="wall3" />
                </GameObject>
            );
        case 'C':
            return (
                <Fragment key={key}>
                    {floor}
                    <CoffeeMachine {...position} />
                </Fragment>
            );
        case 'R':
            return (
                <Fragment key={key}>
                    {floor}
                    <Refrigerator {...position} />
                </Fragment>
            );
        case 'B':
            return (
                <Fragment key={key}>
                    {floor}
                    <Bat {...position} />
                </Fragment>
            );
        case 'a':
            return (
                <Fragment key={key}>
                    {floor}
                    <Apple {...position} />
                </Fragment>
            );
        case 'b':
            return (
                <Fragment key={key}>
                    {floor}
                    <Bacon {...position} />
                </Fragment>
            );
        case 'c':
            return (
                <Fragment key={key}>
                    {floor}
                    <Banana {...position} />
                </Fragment>
            );
        case 'd':
            return (
                <Fragment key={key}>
                    {floor}
                    <Bread {...position} />
                </Fragment>
            );
        case 'e':
            return (
                <Fragment key={key}>
                    {floor}
                    <Butter {...position} />
                </Fragment>
            );
        case 'f':
            return (
                <Fragment key={key}>
                    {floor}
                    <Candy {...position} />
                </Fragment>
            );
        case 'g':
            return (
                <Fragment key={key}>
                    {floor}
                    <Cheese {...position} />
                </Fragment>
            );
        case 'h':
            return (
                <Fragment key={key}>
                    {floor}
                    <Cucumber {...position} />
                </Fragment>
            );
        case 'i':
            return (
                <Fragment key={key}>
                    {floor}
                    <Egg {...position} />
                </Fragment>
            );
        case 'j':
            return (
                <Fragment key={key}>
                    {floor}
                    <Onion {...position} />
                </Fragment>
            );
        case 'k':
            return (
                <Fragment key={key}>
                    {floor}
                    <Sausage {...position} />
                </Fragment>
            );
        case 'l':
            return (
                <Fragment key={key}>
                    {floor}
                    <Tomato {...position} />
                </Fragment>
            );
        case 'm':
            return (
                <Fragment key={key}>
                    {floor}
                    <Watermelon {...position} />
                </Fragment>
            );
        default:
            return null;
    }
};

const startPos = { x: 6, y: 3 };

export default function KitchenScene() {
    const [displayIntroText, setDisplayIntroText] = useState(true);
    return (
        <>
            <GameObject name="map">
                <ambientLight />
                <TileMap data={mapData} resolver={resolveMapTile} definesMapSize />
            </GameObject>
            <GameObject x={0} y={3}>
                <Collider />
                <Interactable />
                <ScenePortal
                    name="entrance"
                    enterDirection={[0, -1]}
                    target="study/exit"
                />
            </GameObject>
            {displayIntroText && (
                <IntoText setDisplayIntroText={setDisplayIntroText} startPos={startPos}>
                    <div>
                        <p>Du entrar nu Köket...</p>
                        <p>Fånga in fladdermusen.</p>
                        <p>Välj rätt mat.</p>
                        <p>Så din kompis Grannen blir nöjd...</p>
                    </div>
                </IntoText>
            )}
            <Player x={6} y={3} />
        </>
    );
}
