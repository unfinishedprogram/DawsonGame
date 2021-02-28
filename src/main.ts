import { Networking } from './multiplayer/networking';
import { Renderer } from './renderer/renderer';
import { Scene } from './scene/scene';
import { s1 } from './scene/s1'
import { Clock } from 'three';

class Main {
    renderer: Renderer;
    networkManager: Networking | null;
    scene: Scene; // Temp!!!

    constructor() {
        this.scene = s1;
        
        this.renderer = new Renderer(1280, 720, this.scene);
        this.scene.loadObjectMeshes(this.renderer);
        this.networkManager = new Networking('127.0.0.1', 8765);
        this.networkManager = null;
        document.body.appendChild(this.renderer.renderer.domElement);

        let that = this;

        window.addEventListener('resize', function() {
            let newWidth: number = window.innerWidth;
            let newHeight: number = window.innerHeight;

            let targetWidth: number = newHeight / 9 * 16;
            let targetHeight: number = newWidth / 16 * 9;

            if (targetHeight > newHeight)
                that.renderer.resize(targetWidth, newHeight);
            else
                that.renderer.resize(newWidth, targetHeight);
        });
    }
}

let game = new Main();

//GAME LOOP
//the game loop is outside the Main class because it caused problems
//w/ requestAnimationFrame and "this". I don't care about it being outside.
let clock = new Clock();

function animate() {
    let deltaTime = clock.getDelta();
    s1.gameObjects[0].update(deltaTime);
    requestAnimationFrame(animate);
    game.scene.update(deltaTime);
    game.renderer.draw();
}
animate();
