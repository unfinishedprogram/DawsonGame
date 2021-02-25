import { Networking } from './multiplayer/networking';
import { Renderer } from './renderer/renderer';
import { Scene } from './scene/scene';
import { s1 } from './scene/s1';
import { Controller } from './components/controller';

class Main {
    renderer: Renderer;
    networkManager: Networking | null;
    scene: Scene; // Temp!!!

    constructor() {
        this.scene = s1;
        this.renderer = new Renderer(1280, 720, this.scene);
        this.networkManager = new Networking('127.0.0.1', 8765);
        this.networkManager = null;
        document.body.appendChild(this.renderer.renderer.domElement);
    }
}

let game = new Main();
var pressedKeys: { [id: string]: boolean } = {};
var controller = new Controller();

// Add event handlers
window.addEventListener('keyup', function (e: KeyboardEvent) {
    pressedKeys[e.code] = false;
    //controller.getInput(pressedKeys);
});
window.addEventListener('keydown', function (e: KeyboardEvent) {
    pressedKeys[e.code] = true;
    controller.getInput(pressedKeys);
});


//GAME LOOP
//the game loop is outside the Main class because it caused problems
//w/ requestAnimationFrame and "this". I don't care about it being outside.
function animate() {
    requestAnimationFrame(animate);
    game.renderer.draw();
}

animate();
