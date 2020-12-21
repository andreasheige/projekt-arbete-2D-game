export function spritePosToFloor4x4(x, y) {
    if (x % 4 === 0 && y % 4 === 0) return 'floor30';
    if (x % 4 === 1 && y % 4 === 0) return 'floor31';
    if (x % 4 === 2 && y % 4 === 0) return 'floor32';
    if (x % 4 === 3 && y % 4 === 0) return 'floor33';
    if (x % 4 === 0 && y % 4 === 1) return 'floor20';
    if (x % 4 === 1 && y % 4 === 1) return 'floor21';
    if (x % 4 === 2 && y % 4 === 1) return 'floor22';
    if (x % 4 === 3 && y % 4 === 1) return 'floor23';
    if (x % 4 === 0 && y % 4 === 2) return 'floor10';
    if (x % 4 === 1 && y % 4 === 2) return 'floor11';
    if (x % 4 === 2 && y % 4 === 2) return 'floor12';
    if (x % 4 === 3 && y % 4 === 2) return 'floor13';
    if (x % 4 === 0 && y % 4 === 3) return 'floor00';
    if (x % 4 === 1 && y % 4 === 3) return 'floor01';
    if (x % 4 === 2 && y % 4 === 3) return 'floor02';
    if (x % 4 === 3 && y % 4 === 3) return 'floor03';
    return 'floor33';
}
