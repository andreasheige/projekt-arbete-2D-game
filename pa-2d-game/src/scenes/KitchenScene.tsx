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
import NextSceneScript from '../components/NextSceneScript';
import { spritePosToFloor4x4 } from '../@core/utils/tileLoadingUtils';
import LosingScoreScript from '../components/LosingScoreScript';

const mapData = mapDataString(`
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # + # #
# · · · · · · · · # · · · · · · # # # + + + # + + + # + + + # + + + #
# · · · · B · · · · · · · · · · # # # + # + # + # + # + # + # # + # #
# · · · · · · # · · · · · # · · · + # + # + + + # + # + # + # + + + #
· · · # · · · · · · · · · · · · # + # + + + # + # + + + # + # + + + #
# · · · · · · · · · · · · · · · # + # + # + # + # + # + # + # + + + #
# · · · · · # · · · · · · · · · # + + + # + + + + + + + # + + + + + #
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # 
`);

const mapData2 = mapDataString(`
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # + # #
# · · · e · · · f # · · · · · · # # # + + + # + + + # + + + # + + + #
# · a · · B · · · · · · k · · · # # # + # + # + # + # + # + # # + # #
# · · · · · · # · g · · · # · · · + # + # + + + # + # + # + # + + + #
· · · # · · · · · · · · · · l · # + # + + + # + # + + + # + # + + + #
# · b · · · c · · · · h · · · · # + # + # + # + # + # + # + # + + + #
# · · · d · # · i · · · j · m · # + + + # + + + + + + + # + + + + + #
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # 
`);

const mapData3 = mapDataString(`
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # + # #
# · · · · · · · · # · · · · · · # # # + + + # + + + # + + + # + + + #
# · · · · · · · · · · · · · · · # # # + # + # + # + # + # + # # + # #
# · · · · · · # · · · · · # · · · + # + # + + + # + # + # + # + + + #
· · · # · · · · · · · · · · · · # + # + + + # + # + + + # + # + + + #
# · · · · · · · · · · · · · · · # + # + # + # + # + # + # + # + + + #
# · · · · · # · · · · · · · · · # + + + # + + + + + + + # + + + + + #
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # 
`);

const resolveMapTile: TileMapResolver = (type, x, y) => {
    const key = `${x}-${y}`;
    const position = { x, y };

    const floor = (
        <GameObject key={key} {...position} layer="ground">
            <Sprite {...spriteData.kitchenfloor02} state={spritePosToFloor4x4(x, y)} />
        </GameObject>
    );

    const floor2 = (
        <GameObject key={key} {...position} layer="ground">
            <Sprite {...spriteData.kitchenfloor01} state={spritePosToFloor4x4(x, y)} />
        </GameObject>
    );

    switch (type) {
        case '·':
            return floor;
        case '+':
            return floor2;
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
        // case 'C':
        //     return (
        //         <Fragment key={key}>
        //             {floor}
        //             <CoffeeMachine interact {...position} />
        //         </Fragment>
        //     );
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
        case 'generate_food_wish':
            return getRandomFoodConfiguration();
        default:
            throw new Error();
    }
}

export default function KitchenScene() {
    const { publish, getGameState } = useGame();
    const [curMap, setCurMap] = useState(mapData);
    const [displayIntroText, setDisplayIntroText] = useState(true);
    const [foodState, dispatch] = useReducer(kitchenReducer, currFoodConfig);
    const [displayFood, setDisplayFood] = useState(false);
    const selectedFoods = displayFood ? plotFood(31, 6, foodState) : null;
    const allGoodFoodGone = foodState.length === 0;
    const [isGateOpen, setIsGateOpen] = useState(false);
    const [hasDrunkCoffe, setHasDrunkCoffe] = useState(false);

    useGameEvent(
        'TALKED_TO_FRIEND',
        count => {
            if (foodState.length === 0 && count === 0) {
                dispatch({ type: 'generate_food_wish' });
            }
            setCurMap(mapData2); // make more variations
            setDisplayFood(true);
            setTimeout(() => {
                setDisplayFood(false);
            }, 5000);
        },
        [foodState, getGameState]
    );

    useGameEvent(
        'EATEN_ALL_GOOD_FOOD',
        () => {
            setCurMap(mapData3); // clear room
        },
        []
    );

    useGameEvent(
        'DRINK_COFFEE',
        () => {
            setHasDrunkCoffe(true);
        },
        []
    );

    async function sendChangeScore(points: number) {
        await publish('CHANGE_SCORE', points);
    }

    async function sendSignalEatenAllGoodFood() {
        await publish('EATEN_ALL_GOOD_FOOD');
    }

    function handleEatFood(foodType: string) {
        const foodWasCorrect = foodState.find(f => f === foodType);
        if (foodWasCorrect) {
            dispatch({ type: 'eat_good_food', foodType });
            sendChangeScore(20);
            if (foodState.length === 1) {
                sendSignalEatenAllGoodFood();
            }
        } else {
            sendChangeScore(-10);
        }
    }

    useGameEvent(
        'EAT_FOOD',
        params => {
            handleEatFood(params.foodType);
        },
        [foodState]
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
            <LosingScoreScript {...startPos} />
            <GameObject x={0} y={3}>
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
                        <p>Öppna lönndörren...</p>
                        <p>Din kompis Grannen är hungrig...</p>
                    </div>
                </IntoText>
            )}
            <Player x={6} y={3} />
            <Friend x={33} y={3} />
            <CoffeeMachine interact={allGoodFoodGone} x={31} y={4} />
            {selectedFoods}
            {!isGateOpen && <GatewayBlock x={18} y={1} />}
            {!hasDrunkCoffe && <GatewayBlock x={32} y={5} />}
            <GameObject x={32} y={7}>
                <Collider />
                <Interactable />
                <ScenePortal
                    name="exit"
                    enterDirection={[0, 1]}
                    target="garden/entrance"
                />
                <NextSceneScript />
            </GameObject>
        </>
    );
}
