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
            roof: [[0, 3]],
            floor2: [[0, 0]],
            roof2: [[1, 3]],
            floor4: [[2, 3]],
            wall1: [[1, 0]],
            wall2: [[3, 0]],
            wall3: [[4, 0]],
            wall4: [[5, 0]],
            grass: [[6, 0]],
            'workstation-1': [[0, 1]],
            'workstation-2': [[1, 1]],
            'coffee-machine': [[2, 1]],
            'coffee-machine-empty': [[3, 1]],
            pizza: [[4, 1]],
            redbutton: [[5, 1]],
            refrigerator: [[6, 1]],
            plant: [[0, 2]],
            pine: [[1, 2]],
            tree: [[2, 2]],
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
    arrowClue: {
        frameWidth: 338,
        frameHeight: 256,
        src: './assets/arrow.png',
    },
    cleaningBucket: {
        frameWidth: 256,
        frameHeight: 256,
        src: './assets/bucket256.png',
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
    mal: {
        src: './assets/butterfly sheet.png',
        frameWidth: 63,
        frameHeight: 59,
        sheet: {
            default: [
                [0, 0],
                [6, 0],
            ],
        },
        opacity: 1,
        frameTime: 110,
    },
    bat: {
        src: './assets/bat.png',
        frameWidth: 16,
        frameHeight: 16,
        sheet: {
            default: [
                [0, 0],
                [2, 0],
            ],
        },
        opacity: 1,
        frameTime: 110,
    },
    rat: {
        src: './assets/bouncing_rat.png',
        frameWidth: 27.5,
        frameHeight: 20,
        sheet: {
            rat: [
                [0, 1],
                [1, 1],
            ],
        },
    },
    food: {
        src: './assets/Food.png',
        frameWidth: 16,
        frameHeight: 16,
        sheet: {
            bread: [[10, 1]],
            butter: [[6, 5]],
            tomato: [[1, 5]],
            cheese: [[7, 5]],
            bacon: [[7, 4]],
            sausage: [[9, 4]],
            egg: [[10, 5]],
            onion: [[2, 2]],
            apple: [[0, 3]],
            banana: [[4, 3]],
            watermelon: [[7, 3]],
            candy: [[4, 7]],
            cucumber: [[6, 2]],
        },
    },
    friend: {
        src: './assets/kompis.png',
        frameWidth: 120,
        frameHeight: 120,
    },
    house: {
        frameWidth: 143,
        frameHeight: 192,
        src: './assets/house.png',
    },
    mushrooms: {
        src: './assets/mushrooms.png',
        frameWidth: 16,
        frameHeight: 16,
        sheet: {
            mush00: [[0, 4]],
            mush01: [[1, 4]],
            mush02: [[2, 4]],
            mush03: [[3, 4]],
            mush04: [[4, 4]],
            mush05: [[5, 4]],
            mush06: [[6, 4]],
            mush07: [[7, 4]],
            mush08: [[0, 3]],
            mush09: [[1, 3]],
            mush10: [[2, 3]],
            mush11: [[3, 3]],
            mush12: [[4, 3]],
            mush13: [[5, 3]],
            mush15: [[6, 3]],
            mush16: [[7, 3]],
            mush17: [[1, 2]],
            mush18: [[2, 2]],
            mush19: [[3, 2]],
            mush20: [[4, 2]],
            mush21: [[5, 2]],
            mush22: [[6, 2]],
            mush23: [[7, 2]],
            mush24: [[0, 1]],
            mush25: [[1, 1]],
            mush26: [[2, 1]],
            mush27: [[3, 1]],
            mush28: [[4, 1]],
            mush29: [[5, 1]],
            mush30: [[6, 1]],
            mush31: [[7, 1]],
            mush32: [[0, 0]],
            mush33: [[1, 0]],
            mush34: [[2, 0]],
            mush35: [[3, 0]],
        },
    },
};

export default spriteData;
