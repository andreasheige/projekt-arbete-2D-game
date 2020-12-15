import React, { useState, useContext } from 'react';

interface ScoreContextValue {
    score: number;
    changeScore: (level: number) => void;
}

export const ScoreContext = React.createContext<ScoreContextValue>(null);

interface Props {
    children: React.ReactNode;
}

export const ScoreProvider = ({ children }: Props) => {
    const [score, setScore] = useState(100);

    function changeScore(scoreDiff: number) {
        console.log('changeScore new', scoreDiff);
        setScore(score + scoreDiff);
    }

    const contextValue: ScoreContextValue = {
        score,
        changeScore,
    };

    return (
        <ScoreContext.Provider value={contextValue}>{children} </ScoreContext.Provider>
    );
};

export function useScore() {
    return useContext(ScoreContext) as ScoreContextValue;
}
