import './style.css'

import { AppModule } from './app/app.module';

const root = document.getElementById('container');
const app = new AppModule(root, {
    helpers: {
        axesHelepr: true,
        gridHelper: true,
        orbitControlsHelper: true,
    }
});

app.run();
