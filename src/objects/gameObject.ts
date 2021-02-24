import { Component } from '../components/component';
import { Object3D } from 'three';

export abstract class GameObject {
    components: Component[] = [];
    object3D: Object3D = new Object3D();

    abstract update(deltaTime: number): void;
    loadModel(){
    };

    // Every game object has a transform. This obliges us to specify
    // its initial state. We can also define another constructor to
    // have a default spawn cords. Like (0, 0, 0).
    // Typescript has a "?" operator and that may be good too.

    constructor(transform: Component) {
        this.components.push(transform);
    }

    // We should be adding and removing components with a function so we can upadte anything 
    // nececary and check compatibility with other components

    // Returns true if component can be added, false otherwise 
    public addComponent(component: Component): boolean{
        return false;
    }

    // Returns true if component can be removed, false otherwise 
    // Mostly this would happen if the component being 
    // removed is a requirement for another
    public removeComponent(component: Component): boolean{
        return false;
    }
}
