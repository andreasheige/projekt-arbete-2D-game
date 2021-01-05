import React, { useState, useContext } from 'react';
import HighScoreListPage from '../components/HighScoreListPage';

interface ScoreContextValue {
    score: number;
    changeScore: (scoreDiff: number) => number;
    endTheGame: (endingLevel: number) => void;
}

export const ScoreContext = React.createContext<ScoreContextValue>(null);

interface Props {
    children: React.ReactNode;
}

export const ScoreProvider = ({ children }: Props) => {
    const [score, setScore] = useState(5);
    const [endLevel, setEndLevel] = useState(-1);

    function changeScore(scoreDiff: number) {
        const nextScore = score + scoreDiff;
        setScore(nextScore);
        return nextScore;
    }

    function endTheGame(endingLevel = 0) {
        setEndLevel(endingLevel);
    }

    const contextValue: ScoreContextValue = {
        score,
        changeScore,
        endTheGame,
    };

    const gameOver = endLevel >= 0;

    if (gameOver) return <HighScoreListPage endingLevel={endLevel} />;

    return (
        <ScoreContext.Provider value={contextValue}>{children} </ScoreContext.Provider>
    );
};

export default function useScore() {
    return useContext(ScoreContext) as ScoreContextValue;
}
