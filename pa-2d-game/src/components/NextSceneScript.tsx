import useGame from '../@core/useGame';
import useGameObjectEvent from '../@core/useGameObjectEvent';
import { InteractionEvent } from '../@core/Interactable';
import { ROOM_COUNTER } from '../constants/gameStates';
import useSceneManager from '../@core/useSceneManager';
import useGameEvent from '../@core/useGameEvent';

export default function NextSceneScript() {
    const { getGameState, setGameState } = useGame();
    const { setScene } = useSceneManager();

    /* eslint-disable */
    useGameObjectEvent<InteractionEvent>('interaction', other => {
            if (other.name === 'player') {
                const roomCounter = getGameState(ROOM_COUNTER) ? getGameState(ROOM_COUNTER) + 1 : 1;
                setGameState(ROOM_COUNTER, roomCounter);
                console.log('roomCounter', roomCounter);
            }
    }, []);
    /* eslint-enable */

    useGameEvent('STOP_GAME', () => {
        setScene('end');
    });

    return null;
}
