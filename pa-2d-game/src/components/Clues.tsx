import React, { useEffect, useState } from 'react';
import { Position } from '../@core/GameObject';
import ArrowClue from '../entities/ArrowClue';
import Key from '../entities/Key';
import MovableRubbish from '../entities/MovableRubbish';
import useGame from '../@core/useGame';

function generateCluePosArray(width: number, height: number, x0: number, y0: number) {
    const cluePos: Array<Position> = [];
    cluePos.push({ x: x0, y: y0 });
    while (cluePos.length < 4) {
        const tail = cluePos.slice(0)[0];
        const x = tail.x + Math.floor(Math.random() * 11) - 5;
        const y = tail.y + Math.floor(Math.random() * 9) - 4;
        const len = (tail.x - x) * (tail.x - x) + (tail.y - y) * (tail.y - y);
        if (len < 5) continue; // keep some distance to next clue
        if (cluePos.find(c => c.x === x && c.y === y)) continue;
        if (x > 1 && y > 1 && x < width - 1 && y < height - 1) {
            cluePos.unshift({ x, y });
        }
    }
    return cluePos.reverse();
}
function addCoveringRubbish(clues: Array<Position>) {
    const extra = clues.map((c, idx) => {
        return <MovableRubbish key={idx} {...c} />;
    });
    return extra;
}

interface Props {
    width: number;
    height: number;
    x0: number;
    y0: number;
}
export default function Clues({ width, height, x0, y0 }: Props) {
    const [clues, setClues] = useState([]);
    const [cover, setCover] = useState([]);
    const { findGameObjectsByXY } = useGame();
    useEffect(() => {
        const cl = generateCluePosArray(width, height, x0, y0);
        setClues(cl);
        // Will guarantee every clue is covered with rubbish
        const posWithoutCover = [];
        cl.forEach((pos, idx) => {
            if (idx !== 0) {
                const gameObjects = findGameObjectsByXY(pos.x, pos.y);
                if (gameObjects.length <= 1) posWithoutCover.push(pos);
            }
        });
        setCover(posWithoutCover);
        return undefined;
    }, [width, height, x0, y0, findGameObjectsByXY]);
    if (clues.length === 0) return null;
    return (
        <>
            <ArrowClue {...clues[0]} dest={clues[1]} order={1} />
            <ArrowClue {...clues[1]} dest={clues[2]} order={2} />
            <ArrowClue {...clues[2]} dest={clues[3]} order={3} />
            <Key {...clues[3]} />
            {addCoveringRubbish(cover)}
        </>
    );
}
