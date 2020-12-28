import { SoundProps } from './@core/Sound';

const soundData: { [index: string]: SoundProps } = {
    eating: {
        // "Chewing" by InspectorJ - freesound.org
        src: './assets/sfx/eating.wav',
    },
    drinking: {
        // "Drinking" by dersuperanton - freesound.org"
        src: './assets/sfx/drinking.wav',
    },
    footstep: {
        src: './assets/sfx/footstep.wav',
        volume: 0.75,
    },
    splash: {
        src: './assets/sfx/splash.mp3',
        volume: 0.75,
    },
    push: {
        src: './assets/sfx/Box Push.mp3',
        volume: 0.75,
    },
    keys: {
        src: './assets/sfx/Keys Jingle.mp3',
        volume: 0.75,
    },
    blipp: {
        src: './assets/sfx/blipp.mp3',
        volume: 0.35,
    },
    wingflapp: {
        src: './assets/sfx/wingflap.wav',
        volume: 0.75,
    }
};

export default soundData;
