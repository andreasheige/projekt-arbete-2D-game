import React, { useRef } from 'react';
import Collider from '../@core/Collider';
import GameObject, { GameObjectProps } from '../@core/GameObject';
import Interactable, { InteractionEvent } from '../@core/Interactable';
import { useSound } from '../@core/Sound';
import Sprite, { SpriteRef } from '../@core/Sprite';
import useGameObject from '../@core/useGameObject';
import useGameObjectEvent from '../@core/useGameObjectEvent';
import soundData from '../soundData';
import spriteData from '../spriteData';
import useGame from '../@core/useGame';

function CoffeeScript() {
    const { getComponent } = useGameObject();
    const { publish } = useGame();
    const fillState = useRef(true);
    const playSfx = useSound(soundData.levelfinished);

    async function sendNotification() {
        await publish('DRINK_COFFEE');
    }

    useGameObjectEvent<InteractionEvent>('interaction', () => {
        if (fillState.current) {
            fillState.current = false;
            getComponent<SpriteRef>('Sprite').setState('coffee-machine-empty');
            playSfx();
            sendNotification();
        }
    });

    return null;
}

interface Props extends GameObjectProps {
    interact: boolean;
}

export default function CoffeeMachine(props: Props) {
    return (
        <GameObject {...props}>
            <Sprite {...spriteData.objects} state="coffee-machine" />
            <Collider />
            {props.interact && <Interactable />}
            <CoffeeScript />
        </GameObject>
    );
}
