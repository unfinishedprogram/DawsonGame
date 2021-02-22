import { Component } from '../Components/Component';
import { Object3D } from 'three';

export abstract class GameObject {
    components: Component[] = [];
    object3D: Object3D = new Object3D();

    abstract update(deltaTime: number): void;

    // Every game object has a transform. This obliges us to specify
    // its initial state. We can also define another constructor to
    // have a default spawn cords. Like (0, 0, 0).
    // Typescript has a "?" operator and that may be good too.
    constructor(transform: Component) {
        this.components.push(transform);
    }
}
