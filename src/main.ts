import { Networking } from './multiplayer/networking';
import { Renderer } from './renderer/renderer';
import { Scene } from './scene/scene';
import { s1 } from './scene/s1'
import { Clock } from 'three';
import { KeyboardObserver } from './controller/keyboard/keyboardObserver';
import { KeyboardInputSubject, MouseButtonInputSubject, MouseMoveInputSubject, GamepadInputSubject, GamepadMoveSubject } from './controller/inputSubject';
import { InputSingleton } from './controller/input';
import { MouseMoveObserver } from './controller/mouse/mouseMoveObserver';
import { MouseButtonObserver } from './controller/mouse/mouseButtonObserver';
import { GamepadListener } from './controller/gamepad/gamepadListener';
import { GamepadButtonObserver } from './controller/gamepad/gamepadButtonObserver';
import { GamepadAnalogObserver } from './controller/gamepad/gamepadAnalogObserver';

class Main {
    renderer: Renderer;
    networkManager: Networking | null;
    scene: Scene; // Temp!!!

    constructor() {
        this.scene = s1;
        this.renderer = new Renderer(1, 1, this.scene);
        this.scene.loadObjectMeshes(this.renderer);
        this.networkManager = new Networking('127.0.0.1', 8765);
        this.networkManager = null;
        document.body.appendChild(this.renderer.renderer.domElement);
        
        window.onresize = () => this.renderer.resize(window.innerWidth, window.innerHeight);
        window.onload = () => this.renderer.resize(window.innerWidth, window.innerHeight);

        this.startInputSubject();
    }

    private startInputSubject() {
        globalThis.Input = InputSingleton.Instance; 
        globalThis.Input.camera = this.scene.camera.camera;
        let keyboardObserver = new KeyboardObserver(['KeyW', 'KeyD', 'KeyA', 'KeyS']);
        let keyboardInputSubject = new KeyboardInputSubject();
        let mouseMoveInputSubject = new MouseMoveInputSubject();
        let mouseClickInputSubject = new MouseButtonInputSubject();
        let mouseMoveObserver = new MouseMoveObserver();
        let mouseButtonObserver = new MouseButtonObserver();

        keyboardInputSubject.addObserver(keyboardObserver);
        mouseMoveInputSubject.addObserver(mouseMoveObserver);
        mouseClickInputSubject.addObserver(mouseButtonObserver);
    }
}

let game = new Main();
let gamepadInputSubject = new GamepadInputSubject(); 
let gamepadMoveSubject = new GamepadMoveSubject();

let gamepadInputListener = new GamepadListener(
    gamepadInputSubject.buttonUp.bind(gamepadInputSubject),
    gamepadInputSubject.buttonDown.bind(gamepadInputSubject),
    gamepadMoveSubject.moveAnalong.bind(gamepadMoveSubject),
);



gamepadInputSubject.addObserver(new GamepadButtonObserver());
gamepadMoveSubject.addObserver(new GamepadAnalogObserver());

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
    gamepadInputListener.update();
}
animate();
