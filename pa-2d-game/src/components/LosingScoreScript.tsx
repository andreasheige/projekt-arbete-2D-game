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

    async function sendChangeScoreNotification(loss: number) {
        await publish('CHANGE_SCORE', -loss);
    }

    useGameLoop(time => {
        // loosing score every 5 sec
        if (time - lastTime.current < 2000) return;
        const roomCounter = getGameState('ROOM_COUNTER')
            ? getGameState('ROOM_COUNTER')
            : 0;
        if (roomCounter < 4) return;
        const { x, y } = props;
        const playerPos = getGameState(PLAYER_POS);
        if (!playerPos) return;
        if (x !== playerPos.x || y !== playerPos.y) {
            lastTime.current = time;
            const loss = Math.floor(roomCounter / 4);
            sendChangeScoreNotification(loss);
        }
    });

    return null;
}
