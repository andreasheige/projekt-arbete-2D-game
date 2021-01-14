import { useEffect, useState } from 'react';
import { Position } from '../@core/GameObject';
import { InteractableRef } from '../@core/Interactable';
import useGameObject from '../@core/useGameObject';
import useGameLoop from '../@core/useGameLoop';
import useGame from '../@core/useGame';
import tileUtils from '../@core/utils/tileUtils';
import { MoveableRef } from '../@core/Moveable';
import { PLAYER_POS } from '../constants/gameStates';

export default function RunningAwayScript({ reactionSpeed, isEaten }) {
    const { getComponent, transform } = useGameObject();
    const { setGameState, getGameState, findGameObjectsByXY } = useGame();
    const [path, setPath] = useState<Position[]>([]);
    const [lastActTime, setLastActTime] = useState(new Date().getTime());

    function tileIsFree(pos: Position) {
        const destPosObject = findGameObjectsByXY(pos.x, pos.y);
        // assuming the tile only contains ground object
        return destPosObject.length === 1 && destPosObject[0].layer === 'ground';
    }

    /**
     * Just running in opposite direction of player. Function can be imporved.
     * @param pos : fleeing Agent
     * @param playerPos : palyer current position
     */
    function selectBestEscapeOption(pos: Position, playerPos: Position) {
        const possibleMoves = [];
        for (let y = 0; y < 3; y++) {
            for (let x = 0; x < 3; x++) {
                if (x === 1 && y === 1) continue; // no movement
                const direction = { x: x - 1, y: y - 1 };
                const nextPosition = tileUtils(pos).add(direction);
                // is same position?
                if (tileUtils(nextPosition).equals(transform)) continue;
                const value =
                    (nextPosition.x - playerPos.x) * (nextPosition.x - playerPos.x) +
                    (nextPosition.y - playerPos.y) * (nextPosition.y - playerPos.y);
                if (tileIsFree(nextPosition)) {
                    possibleMoves.push({ value, nextPosition });
                }
            }
        }
        if (possibleMoves.length === 0) return;
        possibleMoves.sort((a, b) => b.value - a.value);
        const bestMove = possibleMoves[0].nextPosition;
        if (!getComponent<MoveableRef>('Moveable').canMove()) return;
        setPath([bestMove]);
    }

    useGameLoop(() => {
        if (isEaten) return;
        const now = new Date().getTime();
        if (now - lastActTime < reactionSpeed) return;

        const playerPos = getGameState(PLAYER_POS);
        if (!playerPos) return;
        const diffX = playerPos.x - transform.x;
        const diffY = playerPos.y - transform.y;
        const diffSqr = diffX * diffX + diffY * diffY;
        if (diffSqr > 4) return; // will not flee if player aren't close

        selectBestEscapeOption(transform, playerPos);
        setLastActTime(now);
    });

    // walk the path
    useEffect(() => {
        if (!path.length) return;

        const [nextPosition] = path;

        (async () => {
            const anyAction =
                (await getComponent<MoveableRef>('Moveable')?.move(nextPosition)) ||
                (path.length === 1 && // try interaction on last step of path
                    (await getComponent<InteractableRef>('Interactable')?.interact(
                        nextPosition
                    )));

            if (anyAction) {
                // proceed with next step in path
                setPath(current => current.slice(1));
            }
        })();
    }, [path, getComponent, getGameState, setGameState]);

    return null;
}
