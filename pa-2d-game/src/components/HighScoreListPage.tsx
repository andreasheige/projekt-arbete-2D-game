import React, { useState, useEffect } from 'react';

interface Props {
    endingLevel: number;
}

interface StoredResult {
    endingLevel: number;
    date: string;
}

const results: Array<StoredResult> = [
    {
        endingLevel: 0,
        date: '2020-01-03',
    },
    {
        endingLevel: 1,
        date: '2020-01-03',
    },
];

export default function HighScoreListPage({ endingLevel }: Props) {
    const [storedResults, setStoredResults] = useState([]);

    useEffect(() => {
        const newResults = [...results];
        const now = new Date();
        newResults.push({
            endingLevel,
            date: now.toDateString(),
            // @ts-ignore
            added: true,
        });
        // TODO Limit 10, also sub-sort by date
        newResults.sort((a, b) => a.endingLevel - b.endingLevel);
        setStoredResults(newResults);
    }, [endingLevel]);

    const resultList = storedResults.map(r => (
        <li key={r.date} style={{ color: r.added ? 'white' : 'grey' }}>
            level: {r.endingLevel}, date: {r.date}
        </li>
    ));
    return (
        <div>
            <h1>Game Over</h1>
            List of Results
            <ul>{resultList}</ul>
        </div>
    );
}
