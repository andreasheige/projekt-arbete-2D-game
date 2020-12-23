import css from '@emotion/css';
import '../assets/fonts/Langar-Regular.ttf';

export default function globalStyles() {
    return css`
        :root {
            user-select: none;
        }
        :root,
        body,
        #root {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            height: 100%;
        }
        @font-face {
            font-family: 'Langar';
            src: local('Langar'),
                url(./assets/fonts/Langar-Regular.ttf) format('truetype');
        }
        body {
            font-family: Langar;
            position: relative;
            margin: 0;
            padding: 0;
            overflow: hidden;
            color: white;
            background: black;
        }
    `;
}
