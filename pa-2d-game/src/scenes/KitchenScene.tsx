import React, { Fragment, useState, useReducer } from 'react';
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
import Friend from '../entities/Friend';
import useGameEvent from '../@core/useGameEvent';
import useGame from '../@core/useGame';
import GatewayBlock from '../entities/GatewayBlock';

const mapData = mapDataString(`
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # · # #
# · · · · · · · · # · · · · · · # # # · · · # · · · # · · · # · · · #
# · · · · B · · · · · · · · · · # # # · # · # · # · # · # · # # · # #
# · · · · · · # · · · · · # · · · · # · # · # · # · # · # · # C · · #
· · · # · · · · · · · · · · · · # · # · # · # · # · # · # · # · · · #
# · · · · · · · · · · · · · · · # · # · # · # · # · # · # · # · · · #
# · · · · · # · · · · · · · · · # · · · # · · · # · · · # · · · · · #
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # 
`);

const mapData2 = mapDataString(`
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # · # #
# · · · e · · · f # · · · · · · # # # · · · # · · · # · · · # · · · #
# · a · · B · · · · · · k · · · # # # · # · # · # · # · # · # # · # #
# · · · · · · # · g · · · # · · · · # · # · # · # · # · # · # C · · #
· · · # · · · · · · · · · · l · # · # · # · # · # · # · # · # · · · #
# · b · · · c · · · · h · · · · # · # · # · # · # · # · # · # · · · #
# · · · d · # · i · · · j · m · # · · · # · · · # · · · # · · · · · #
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
        // case 'Q':
        //     return (
        //         <Fragment key={key}>
        //             {floor}
        //             <Friend {...position} />
        //         </Fragment>
        //     );
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

const foodConfigurations = [
    ['a', 'g', 'j'],
    ['b', 'h', 'd'],
];

function getRandomFoodConfiguration(): Array<string> {
    const foodIdx = Math.floor(Math.random() * foodConfigurations.length);
    return foodConfigurations[foodIdx];
}

function plotFood(x0: number, y0: number, foodArray: Array<string>) {
    return foodArray.map((food, inx: number) => resolveMapTile(food, x0 + inx, y0));
}

const currFoodConfig = [...getRandomFoodConfiguration()];

function kitchenReducer(state: Array<string>, action) {
    switch (action.type) {
        case 'eat_good_food':
            return state.filter(f => f !== action.foodType);
        default:
            throw new Error();
    }
}

export default function KitchenScene() {
    const { publish } = useGame();
    const [curMap, setCurMap] = useState(mapData);
    const [displayIntroText, setDisplayIntroText] = useState(true);
    const [foodState, dispatch] = useReducer(kitchenReducer, currFoodConfig);
    const selectedFoods = plotFood(31, 6, foodState);
    const allGoodFoodGone = foodState.length === 0;
    const [isGateOpen, setIsGateOpen] = useState(false);

    useGameEvent(
        'TALKED_TO_FRIEND',
        () => {
            setCurMap(mapData2); // make more variations
        },
        []
    );

    async function sendChangeScore(points: number) {
        await publish('CHANGE_SCORE', points);
    }

    function handleEatFood(foodType: string) {
        const foodWasCorrect = foodState.find(f => f === foodType);
        if (foodWasCorrect) {
            dispatch({ type: 'eat_good_food', foodType });
            sendChangeScore(20);
        } else {
            sendChangeScore(-10);
        }
    }

    useGameEvent(
        'EAT_FOOD',
        params => {
            handleEatFood(params.foodType);
        },
        []
    );

    useGameEvent(
        'BAT_DIED',
        () => {
            setIsGateOpen(true);
        },
        []
    );

    return (
        <>
            <GameObject name="map">
                <ambientLight />
                <TileMap data={curMap} resolver={resolveMapTile} definesMapSize />
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
            {!allGoodFoodGone && <Friend x={33} y={3} />}
            {selectedFoods}
            {!isGateOpen && <GatewayBlock x={18} y={1} />}
            {!allGoodFoodGone && <GatewayBlock x={32} y={5} />}
        </>
    );
}
