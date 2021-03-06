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
            }
    }, []);
    /* eslint-enable */

    // Will translate this event to a black sceen
    // Maybe not a perfet spot for this
    useGameEvent('STOP_GAME', () => {
        setScene('end');
    });

    return null;
}
