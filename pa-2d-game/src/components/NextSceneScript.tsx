// import React, { useEffect } from 'react';
import useGame from '../@core/useGame';
import useGameObjectEvent from '../@core/useGameObjectEvent';
import { InteractionEvent } from '../@core/Interactable';
import { ROOM_COUNTER } from '../constants/gameStates';

export default function NextSceneScript() {
    const { getGameState, setGameState } = useGame();

    /* eslint-disable */
    useGameObjectEvent<InteractionEvent>('interaction', other => {
            if (other.name === 'player') {
                const roomCounter = getGameState(ROOM_COUNTER) ? getGameState(ROOM_COUNTER) + 1 : 1;
                setGameState(ROOM_COUNTER, roomCounter);
                console.log('roomCounter', roomCounter);
            }
    }, []);
    /* eslint-enable */

    return null;
}
