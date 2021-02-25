import { Networking } from './multiplayer/networking';
import { Renderer } from './renderer/renderer';
import { Scene } from './scene/scene';
import { s1 } from './scene/s1'
import { Clock, SubtractEquation } from 'three';

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
    }
}

 var pressedKeys: { [key: number]: boolean; } = {};
 window.onkeyup = function(e: KeyboardEvent) { pressedKeys[e.keyCode] = false; }
 window.onkeydown = function(e: KeyboardEvent) {
    pressedKeys[e.keyCode] = true; 
    for(let i = 0; i < 200; i++){
        if(pressedKeys[i]){
            var vec = [0,0];
            if(pressedKeys[87]){vec[0]+=1} //W
            if(pressedKeys[83]){vec[0]-=1} //S
            if(pressedKeys[65]){vec[1]+=1} //A
            if(pressedKeys[68]){vec[1]-=1} //D
            console.log('y: ', vec[0], ' x: ', vec[1]);
            //console.log(String.fromCharCode(i));
        }
    }
}

let game = new Main();

//GAME LOOP
//the game loop is outside the Main class because it caused problems
//w/ requestAnimationFrame and "this". I don't care about it being outside.
let clock = new Clock();

function animate() {
    
    let deltaTime = clock.getDelta();
    requestAnimationFrame(animate);
    game.scene.update(deltaTime);
    game.renderer.draw();
}

game.renderer.load();
animate();
