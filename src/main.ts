import { Renderer } from './renderer/renderer';
import { Scene } from './scene/scene';
import { Clock } from 'three';
import { KeyboardObserver } from './controller/keyboard/keyboardObserver';
import { KeyboardInputSubject, MouseButtonInputSubject, MouseMoveInputSubject, GamepadInputSubject, GamepadMoveSubject } from './controller/inputSubject';
import { InputSingleton } from './controller/input';
import { MouseMoveObserver } from './controller/mouse/mouseMoveObserver';
import { MouseButtonObserver } from './controller/mouse/mouseButtonObserver';
import { ChangeObject } from './subjects/objectSubject';
import { Action } from './utils/action';
import { SubjectSingleton } from './utils/subjectSingleton'
import { GamepadListener } from './controller/gamepad/gamepadListener';
import { GamepadAnalogObserver } from './controller/gamepad/gamepadAnalogObserver';
import { GamepadButtonObserver } from './controller/gamepad/gamepadButtonObserver';
import { DiepIo } from './diepIo/diepio';
import { CollisionSignleton } from './collision/collisionSingleton';

interface InputListeners {
    mouse?: boolean,
    keyboard?: string[],
    gamepad?: boolean,
}

export class Main {
    renderer: Renderer;
    //networkManager: Networking | null;

    keyboardObserver?: KeyboardObserver;
    keyboardInputSubject?: KeyboardInputSubject;
    mouseMoveInputSubject?: MouseMoveInputSubject;
    mouseClickInputSubject?: MouseButtonInputSubject;
    mouseMoveObserver?: MouseMoveObserver;
    mouseButtonObserver?: MouseButtonObserver;
    game: DiepIo;

    frameRate: number = 60;
    frameTime: number = 1000 / this.frameRate;

    tracker:number = 0;

    last = new Date(); // REMOVE IT!!

    constructor(inputListeners: InputListeners, scene: Scene, game: DiepIo) {
      
        this.game = game;
        this.renderer = new Renderer(1, 1, scene);
        scene.setRenderer(this.renderer);
        //this.networkManager = new Networking('127.0.0.1', 8765);
        //this.networkManager = null;

        document.body.appendChild(this.renderer.renderer.domElement);
        
        window.onresize = () => this.renderer.resize(window.innerWidth, window.innerHeight);
        window.onload = () => this.renderer.resize(window.innerWidth, window.innerHeight);

        //Initalizing observers and subjects
        globalThis.Input = InputSingleton.Instance; 
        globalThis.Input.camera = scene.camera.camera;
        globalThis.Subjects = SubjectSingleton.Instance;
        //TODO Find a better way of initializing collision singleton before the scene
        // globalThis.Collision = CollisionSignleton.Instance;

        if (inputListeners.keyboard) {
            this.keyboardObserver = new KeyboardObserver(inputListeners.keyboard);
            this.keyboardInputSubject = new KeyboardInputSubject();
            this.startKeyboardSubject();
        }

        if ( inputListeners.mouse ) {
            this.mouseMoveObserver = new MouseMoveObserver();
            this.mouseButtonObserver = new MouseButtonObserver();

            this.mouseMoveInputSubject = new MouseMoveInputSubject();
            this.mouseClickInputSubject = new MouseButtonInputSubject();
            this.startMouseSubject();
        }

        this.startSubjects(scene);
        this.loadObjects(scene);
    }

    public start() {
        window.requestAnimationFrame(this.update.bind(this));
    }

    private startSubjects(scene: Scene) {

        globalThis.Subjects.removeObjectSubject.addObserver(this.renderer);
        globalThis.Subjects.removeObjectSubject.addObserver(scene);

        globalThis.Subjects.addObjectSubject.addObserver(this.renderer);
        globalThis.Subjects.addObjectSubject.addObserver(scene);

    }

    private startKeyboardSubject() {
        if (this.keyboardInputSubject && this.keyboardObserver) {
            this.keyboardInputSubject.addObserver(this.keyboardObserver);
        }
    }

    private startMouseSubject() {
        if (this.mouseClickInputSubject && this.mouseMoveInputSubject
            && this.mouseButtonObserver && this.mouseMoveObserver) {
            this.mouseClickInputSubject.addObserver(this.mouseButtonObserver);
            this.mouseMoveInputSubject.addObserver(this.mouseMoveObserver);
        }
    }

    private async loadObjects(scene: Scene) {
        scene.getGameObjects().forEach(async (object) => {
            this.tracker++;
            globalThis.Subjects.addObjectSubject.notify(Action.ADD_OBJECT, new ChangeObject(object) );
        })
    }

    // TODO: call renderer.update instead of updating 3 renderer here...
    update() {
        let deltaTime = clock.getDelta();
        this.renderer.scene.update(deltaTime);
        this.renderer.draw();
        this.renderer.renderStats.update();
        window.requestAnimationFrame(this.update.bind(this));
    }
}

//let game = new Main();
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


//gamepadInputListener.update();

// CALL DIEP IO
//... -> diep io create main
