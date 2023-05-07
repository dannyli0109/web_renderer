import { Program } from './program';
import './style.css';

async function init() {
    let program = new Program();
    await program.init();
    program.update();
}

init();