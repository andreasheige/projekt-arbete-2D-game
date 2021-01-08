import React, { useState } from 'react';
import tileUtils from '../@core/utils/tileUtils';
import Collider from '../@core/Collider';
import GameObject from '../@core/GameObject';
import Sprite from '../@core/Sprite';
import spriteData from '../spriteData';
import useGame from '../@core/useGame';
import useGameObject from '../@core/useGameObject';
import useGameLoop from '../@core/useGameLoop';
import Moveable, { MoveableRef } from '../@core/Moveable';
import ScoreScript from '../components/ScoreScript';
import useGameObjectEvent from '../@core/useGameObjectEvent';
import Interactable, { InteractionEvent } from '../@core/Interactable';
import { PLAYER_POS } from '../constants/gameStates';

function MovingWallScript({ wallDirection, speed }) {
    const { getComponent, transform } = useGameObject();
    const [YMove, setYMove] = useState(wallDirection);
    const [lastActTime, setLastActTime] = useState(new Date().getTime());
    const [lastScoreTic, setLastScoreTic] = useState(new Date().getTime());
    const { publish } = useGame();
    const { getGameState, setGameState } = useGame();

    async function sendChangeScoreNotification() {
        await publish('CHANGE_SCORE', -5);
    }

    useGameLoop(() => {
        const now = new Date().getTime();
        if (now - lastActTime < speed) return;

        if (transform.y === 1) {
            setYMove(1);
        }
        if (transform.y === 6) {
            setYMove(-1);
        }
        const direction = {
            x: 0,
            y: YMove,
        };

        const nextPosition = tileUtils(transform).add(direction);

        const { x: playerX, y: playerY } = getGameState(PLAYER_POS);
        if (
            nextPosition.x === playerX &&
            nextPosition.y === playerY &&
            now - lastScoreTic > 1000
        ) {
            sendChangeScoreNotification();
            setLastScoreTic(now);
        }

        setLastActTime(now);
        (async () => {
            await getComponent<MoveableRef>('Moveable')?.move(nextPosition);
        })();
    });
    return null;
}

export default function MovingWall(props) {
    return (
        <GameObject layer="wall" {...props}>
            <Collider />
            <Moveable />
            <Sprite {...spriteData.objects} state="wall1" />
            <Interactable />
            <MovingWallScript {...props} />
        </GameObject>
    );
}
