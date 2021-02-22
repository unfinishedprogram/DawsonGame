import { Networking } from './Multiplayer/networking';
import { Renderer } from './Renderer/Renderer';
import { Scene } from './Scene/Scene';
import { s1 } from './Scene/s1'

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

//GAME LOOP
//the game loop is outside the Main class because it caused problems
//w/ requestAnimationFrame and "this". I don't care about it being outside.
function animate() {
    requestAnimationFrame(animate);
    game.renderer.draw();
}

animate();
