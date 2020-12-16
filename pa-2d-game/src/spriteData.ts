import { SpriteProps } from './@core/Sprite';

const spriteData: { [index: string]: SpriteProps } = {
    ui: {
        src: './assets/ui.png',
        sheet: {
            'self-select': [
                [4, 0],
                [5, 0],
            ],
            select: [[4, 0]],
            dot: [[1, 0]],
            solid: [[0, 1]],
        },
    },
    player: {
        src: './assets/player.png',
        frameWidth: 20,
        frameHeight: 20,
        frameTime: 300,
        sheet: {
            default: [[0, 2]],
            walk: [
                [1, 2],
                [2, 2],
            ],
            action: [
                [0, 1],
                [2, 1],
            ],
        },
    },
    objects: {
        src: './assets/objects.png',
        frameWidth: 20,
        frameHeight: 20,
        sheet: {
            floor1: [[0, 3]],
            floor2: [[0, 0]],
            floor3: [[1, 3]],
            floor4: [[2, 3]],
            wall1: [[1, 0]],
            wall2: [[3, 0]],
            wall3: [[4, 0]],
            wall4: [[5, 0]],
            'workstation-1': [[0, 1]],
            'workstation-2': [[1, 1]],
            'coffee-machine': [[2, 1]],
            'coffee-machine-empty': [[3, 1]],
            pizza: [[4, 1]],
            redbutton: [[5, 1]],
            refrigerator: [[6, 1]],
            plant: [[0, 2]],
            ghost: [[3, 3]],
        },
    },
    moreFloor: {
        src: './assets/Chew Magna Fortress, UDK - Page 9 - lighter.png',
        // src: './assets/testmap.png',
        frameWidth: 128,
        frameHeight: 128,
        sheet: {
            floor00: [[0, 3]],
            floor01: [[1, 3]],
            floor02: [[2, 3]],
            floor03: [[3, 3]],
            floor10: [[0, 2]],
            floor11: [[1, 2]],
            floor12: [[2, 2]],
            floor13: [[3, 2]],
            floor20: [[0, 1]],
            floor21: [[1, 1]],
            floor22: [[2, 1]],
            floor23: [[3, 1]],
            floor30: [[0, 0]],
            floor31: [[1, 0]],
            floor32: [[2, 0]],
            floor33: [[3, 0]], // 1, 4
        },
    },
    footstep: {
        src: './assets/footstep.png',
        sheet: {
            default: [
                [0, 0],
                [2, 0],
            ],
        },
        opacity: 0.75,
        frameTime: 150,
    },
    rat: {
        src: './assets/bouncing_rat.png',
        frameWidth: 27.5,
        frameHeight: 20,
        sheet: {
            rat: [
                // [0, 0],
                // [1, 0],
                [0, 1],
                [1, 1],
                [0, 2],
                [1, 2],
            ],
        },
    },
};

export default spriteData;
