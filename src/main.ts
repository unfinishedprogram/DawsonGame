import { Networking } from './multiplayer/networking';
import { Renderer } from './renderer/renderer';
import { Scene } from './scene/scene';
import { gameScene } from './scene/gameScene'
import { Clock } from 'three';
import { KeyboardObserver } from './controller/keyboardObserver';
import { KeyboardInputSubject, MouseButtonInputSubject, MouseMoveInputSubject } from './controller/inputSubject';
import { InputSingleton } from './controller/input';
import { MouseMoveObserver } from './controller/mouseMoveObserver';
import { MouseButtonObserver } from './controller/mouseButtonObserver';
import { RemoveObjectSubject, AddObjectSubject, ChangeObject } from './subjects/objectSubject';
import { Action } from './utils/action';
import { SubjectSingleton } from './utils/subjectSingleton'

class Main {
    renderer: Renderer;
    networkManager: Networking | null;
    scene: Scene; // Temp!!!

    keyboardObserver: KeyboardObserver;
    keyboardInputSubject: KeyboardInputSubject;
    mouseMoveInputSubject: MouseMoveInputSubject;
    mouseClickInputSubject: MouseButtonInputSubject;
    mouseMoveObserver: MouseMoveObserver;
    mouseButtonObserver: MouseButtonObserver;

    tracker:number = 0;

    constructor() {
        this.scene = gameScene;
        this.renderer = new Renderer(1, 1, this.scene);
        this.scene.setRenderer(this.renderer);
        this.networkManager = new Networking('127.0.0.1', 8765);
        this.networkManager = null;

        document.body.appendChild(this.renderer.renderer.domElement);
        
        window.onresize = () => this.renderer.resize(window.innerWidth, window.innerHeight);
        window.onload = () => this.renderer.resize(window.innerWidth, window.innerHeight);


        /**
         * Initalizing observers and subjects
         */

        globalThis.Input = InputSingleton.Instance; 
        globalThis.Input.camera = this.scene.camera.camera;
        globalThis.Subjects = SubjectSingleton.Instance;

        this.keyboardObserver = new KeyboardObserver(['KeyW', 'KeyD', 'KeyA', 'KeyS', 'Space']);
        this.mouseMoveObserver = new MouseMoveObserver();
        this.mouseButtonObserver = new MouseButtonObserver();

        this.keyboardInputSubject = new KeyboardInputSubject();
        this.mouseMoveInputSubject = new MouseMoveInputSubject();
        this.mouseClickInputSubject = new MouseButtonInputSubject();

        this.startSubjects();

        this.loadObjects();
    }

    

    private startSubjects() {

        globalThis.Subjects.removeObjectSubject.addObserver(this.renderer);
        globalThis.Subjects.removeObjectSubject.addObserver(this.scene);

        globalThis.Subjects.addObjectSubject.addObserver(this.renderer);
        globalThis.Subjects.addObjectSubject.addObserver(this.scene);

        this.keyboardInputSubject.addObserver(this.keyboardObserver);
        this.mouseMoveInputSubject.addObserver(this.mouseMoveObserver);
        this.mouseClickInputSubject.addObserver(this.mouseButtonObserver);
    }

    private async loadObjects() {
        this.scene.gameObjects.forEach(async (object) => {
            this.tracker++;
            await object.loadMesh();
            globalThis.Subjects.addObjectSubject.notify(Action.ADD_OBJECT, new ChangeObject(object) );
        })
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
animate();
