import { useRef } from 'react';
import useGameLoop from '../@core/useGameLoop';
import useGame from '../@core/useGame';
import { PLAYER_POS } from '../constants/gameStates';

interface Props {
    x: number;
    y: number;
}

export default function LosingScoreScript(props: Props) {
    const { publish, getGameState } = useGame();
    const lastTime = useRef(0);

    async function sendChangeScoreNotification() {
        await publish('CHANGE_SCORE', -1);
    }

    useGameLoop(time => {
        const playerPos = getGameState(PLAYER_POS);
        const { x, y } = props;
        if (time - lastTime.current < 2000) return;
        if (!playerPos) return;
        if (x !== playerPos.x || y !== playerPos.y) {
            lastTime.current = time;
            sendChangeScoreNotification();
        }
    });

    return null;
}
