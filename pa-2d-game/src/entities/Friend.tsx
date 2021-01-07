import React, { useState } from 'react';
import CharacterScript from '../components/CharacterScript';
import Collider from '../@core/Collider';
import GameObject, { GameObjectProps } from '../@core/GameObject';
import Sprite from '../@core/Sprite';
import spriteData from '../spriteData';
import useGameObjectEvent from '../@core/useGameObjectEvent';
import useGame from '../@core/useGame';
import Interactable, { InteractionEvent } from '../@core/Interactable';
import ScoreScript from '../components/ScoreScript';

function DisableOnTriggerScript() {
    const { publish } = useGame();
    const [talkedToFriendCounter, setTalkedToFriendCounter] = useState(0);

    async function sendTalkNotification(counter: number) {
        await publish('TALKED_TO_FRIEND', counter);
    }

    /* eslint-disable */
    useGameObjectEvent<InteractionEvent>('interaction', other => {
        if (other.name === 'player') {
            setTalkedToFriendCounter(() => talkedToFriendCounter + 1);
            sendTalkNotification(talkedToFriendCounter);
        }
    }, [talkedToFriendCounter]);
    /* eslint-enable */

    return null;
}

export default function Friend(props: GameObjectProps) {
    return (
        <GameObject layer="item" {...props}>
            <Collider />
            <Interactable />
            <CharacterScript>
                <Sprite {...spriteData.friend} offset={{ x: 0, y: 0.0 }} />
            </CharacterScript>
            <DisableOnTriggerScript />
            <ScoreScript once scoreChange={-10} />
        </GameObject>
    );
}
