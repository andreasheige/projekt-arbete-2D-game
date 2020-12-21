import React, { useState, useContext } from 'react';

interface ScoreContextValue {
    score: number;
    changeScore: (level: number) => number;
}

export const ScoreContext = React.createContext<ScoreContextValue>(null);

interface Props {
    children: React.ReactNode;
}

export const ScoreProvider = ({ children }: Props) => {
    const [score, setScore] = useState(0);

    function changeScore(scoreDiff: number) {
        const nextScore = score + scoreDiff;
        setScore(nextScore);
        return nextScore;
    }

    const contextValue: ScoreContextValue = {
        score,
        changeScore,
    };

    return (
        <ScoreContext.Provider value={contextValue}>{children} </ScoreContext.Provider>
    );
};

export default function useScore() {
    return useContext(ScoreContext) as ScoreContextValue;
}
