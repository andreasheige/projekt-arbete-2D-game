import { useSound } from '../@core/Sound';
import { TriggerEvent } from '../@core/Collider';
import useGame from '../@core/useGame';
import useGameObject from '../@core/useGameObject';
import useGameObjectEvent from '../@core/useGameObjectEvent';
import soundData from '../soundData';

export default function EatFoodScript({ foodType }) {
    const { publish } = useGame();
    const { getRef } = useGameObject();
    const playSfx = useSound(soundData.eating);

    async function sendChangeScoreNotification() {
        await publish('EAT_FOOD', { foodType });
    }

    useGameObjectEvent<TriggerEvent>('trigger', other => {
        if (other.name === 'player') {
            sendChangeScoreNotification();
            getRef().setDisabled(true);
            playSfx();
        }
    });

    return null;
}
