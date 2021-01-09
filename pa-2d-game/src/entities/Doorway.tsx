import React, { useState } from 'react';
import Collider from '../@core/Collider';
import GameObject from '../@core/GameObject';
import Sprite from '../@core/Sprite';
import spriteData from '../spriteData';
import useGameEvent from '../@core/useGameEvent';
import { OPEN_DOOR } from '../constants/events';
import Interactable from '../@core/Interactable';

interface Props {
    x: number;
    y: number;
    children: React.ReactNode;
}

function Door(props: Props) {
    const [isOpen, setOpen] = useState(false);
    const offSet = { x: 0.065, y: 0 };
    const offsetOpen = { x: -0.07, y: 0.0 };

    useGameEvent(
        OPEN_DOOR,
        () => {
            setOpen(true);
        },
        [setOpen]
    );

    if (isOpen)
        return (
            <>
                <Collider />
                <Interactable />
                {/* <Sprite {...spriteData.wallpaper01} /> */}
                <Sprite {...spriteData.doorway01} state="open" offset={offsetOpen} />
                {props.children}
            </>
        );

    return (
        <>
            <Collider />
            {/* <Sprite {...spriteData.wallpaper01} /> */}
            <Sprite {...spriteData.doorway01} state="closed" offset={offSet} />
        </>
    );
}

export default function Doorway(props: Props) {
    return (
        <GameObject layer="obstacle" {...props}>
            <Sprite {...spriteData.wallpaper01} />
            <Door {...props} />
        </GameObject>
    );
}
