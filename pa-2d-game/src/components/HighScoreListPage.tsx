import React, { useState, useEffect } from 'react';

interface Props {
    endingLevel: number;
}
interface StoredResult {
    endingLevel: number;
    date: string;
}

export default function HighScoreListPage({ endingLevel }: Props) {
    const [storedResults, setStoredResults] = useState([]);

    useEffect(() => {
        const localStoreResults: Array<StoredResult> = JSON.parse(
            localStorage.getItem('results')
        );
        const newResults: Array<StoredResult> = !localStoreResults
            ? []
            : localStoreResults;
        const now = new Date();
        newResults.push({
            endingLevel,
            date: now.toDateString(),
            // @ts-ignore
            added: true,
        });
        localStorage.setItem('results', JSON.stringify(newResults));
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
        <div
            id="wrapper"
            style={{
                backgroundColor: '#292B37',
                margin: '15, 20, 20, 15',
                paddingLeft: '17px',
                paddingRight: '17px',
                width: '850px',
                height: '650px',
                borderRadius: '25px',
            }}
        >
            <div id="header">
                <h1
                    style={{
                        color: '#F0242C',
                        paddingLeft: '35%',
                        paddingRight: 'auto',
                        fontWeight: 'bold',
                        textShadow: '1px 2px 3px white',
                        fontSize: '3rem',
                    }}
                >
                    Game Over
                </h1>
            </div>
            <div
                id="list"
                style={{
                    color: '#F4F1EA',
                    height: '400px',
                    marginBottom: '5px',
                }}
            >
                <h2
                    style={{
                        color: '#F0242C',
                        fontFamily: 'arial',
                        textTransform: 'uppercase',
                    }}
                >
                    List of Results
                </h2>
                <ol
                    style={{
                        color: '#F0242C',
                        fontFamily: 'arial',
                        textTransform: 'uppercase',
                    }}
                >
                    {resultList}
                </ol>
            </div>
            <div
                id="footer"
                style={{
                    position: 'relative',
                    bottom: '0px',
                    display: 'flex',
                    justifyContent: 'space-around',
                }}
            >
                <a
                    style={{
                        color: '#292B37',
                        padding: '15px 15px 15px 15px',
                        fontFamily: 'arial',
                        textDecoration: 'none',
                        textTransform: 'uppercase',
                        backgroundColor: '#F4F1EA',
                        borderRadius: '90px',
                    }}
                    href="https://krokslottet-test.s3.eu-north-1.amazonaws.com/index.html"
                >
                    spela igen
                </a>
                <a
                    style={{
                        color: '#292B37',
                        padding: '15px 15px 15px 15px',
                        fontFamily: 'arial',
                        textDecoration: 'none',
                        textTransform: 'uppercase',
                        backgroundColor: '#F4F1EA',
                        borderRadius: '90px',
                    }}
                    href="https://andreasheige.me/krakslottet/index.html"
                >
                    startsida
                </a>
            </div>
        </div>
    );
}
