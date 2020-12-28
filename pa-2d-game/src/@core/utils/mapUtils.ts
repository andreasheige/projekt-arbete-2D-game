import { Position } from '../GameObject';
import { TileMapData, TileMapDataValue } from '../TileMap';
import tileUtils from './tileUtils';

export type MapDataCallback = (position: Position) => TileMapDataValue;

export function createMapData(
    width: number,
    height: number,
    callback: MapDataCallback
): TileMapData {
    return Array.from({ length: height }).map((_, y) => {
        return Array.from({ length: width }).map((__, x) => {
            return callback({ x, y });
        });
    });
}

export function getTilesFromRect(offset: Position, width: number, height: number) {
    const list: Position[] = [];
    Array.from({ length: height }).forEach((_, y) => {
        Array.from({ length: width }).forEach((__, x) => {
            list.push(tileUtils({ x, y }).add(offset));
        });
    });
    return list;
}

export function getTilesFromMapData(
    data: TileMapData,
    filter: (value: TileMapDataValue) => boolean
) {
    const list: Position[] = [];
    data.forEach((row, y) => {
        row.forEach((value, x) => {
            if (filter(value)) {
                list.push({ x, y });
            }
        });
    });
    return list;
}

export function mapDataString(str: string): TileMapData {
    const lineBreak = '\n';
    const data = [];
    let line = -1;
    let string = str;
    // strip any break at the end
    if (string[string.length - 1] === lineBreak) {
        string = string.slice(0, -1);
    }
    for (const char of string) {
        if (char === ' ') continue;
        if (char === lineBreak) {
            data[++line] = [];
        } else {
            data[line].push(char);
        }
    }
    return data;
}

/**
 * Will random replace characters in a map
 * @param data map to be changed
 * @param posMask character marked for change
 * @param dencity chance of change: 0 to 1
 * @param replacement character to replace posMask
 */
export function insertRandomMarks(
    data: TileMapData,
    posMask: string,
    dencity: number,
    replacement: string
): TileMapData {
    data.forEach(row => {
        row.forEach((tile, idx) => {
            if (tile === posMask) {
                const char = Math.random() < dencity ? replacement : tile;
                row[idx] = char;
            }
        });
    });
    return data;
}

export function insertNRandomMarks(
    data: TileMapData,
    posMask: string,
    nItems: number,
    replacement: string
): TileMapData {
    let nItemsLeft = nItems;
    while (nItemsLeft > 0) {
        // NOTE: this code is a bit inefficient, but its only run once
        /* eslint-disable */
        data.forEach(row => {
            row.forEach((tile, idx) => {
                if (tile === posMask && Math.random() < 0.01) {
                    row[idx] = replacement;
                    nItemsLeft -= 1;
                }
            });
        });
        /* eslint-enable */
    }
    return data;
}

export function injectMapData(
    source: TileMapData,
    data: TileMapData,
    { x, y }: Position // bottom left
) {
    data.forEach((row, indexY, { length }) => {
        row.forEach((col, indexX) => {
            source[source.length - y - (length - indexY)][x + indexX] = col;
        });
    });
}
