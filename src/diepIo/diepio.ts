import { Scene } from "../scene/scene";
import { Main } from "../main";
import { gameScene } from './scenes/mainScene';
import { CollisionSignleton } from "../collision/collisionSingleton";

export class DiepIo {
    root_scene: Scene;
    engine: Main;
    constructor() {

        this.root_scene = gameScene;

        this.engine = new Main({'keyboard': ['KeyW', 'KeyS', 'KeyD', 'KeyA', 'Space'], 'mouse': true}, this.root_scene, this);

        // create other stuff here.

        this.engine.start();
    }

    update() {}
}

new DiepIo();
