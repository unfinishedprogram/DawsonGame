import { Component } from '../components/component';
import { Transform } from '../components/transform';
import { Drawable } from '../baseClasses/drawable';

/** Class representing an object with components. */
export abstract class GameObject extends Drawable {
    components: Component[] = [];

    abstract update(deltaTime: number): void;
    abstract meshLoaded(): void;

    // Every game object has a transform. This obliges us to specify
    // its initial state. We can also define another constructor to
    // have a default spawn cords. Like (0, 0, 0).
    // Typescript has a "?" operator and that may be good too.

    /**
     * Initializes the game object
     * @param transform The transform component of the gameObject
     */
    constructor(transform: Transform, VOXName: string) {
        super(VOXName); 
    }
    // We should be adding and removing components with a function so we can update anything 
    // nececary and check compatibility with other components

    /**
     * Adds component to the object
     * @param component Component to add
     * @returns If component can be added
     */
    public addComponent(component: Component): boolean {
        this.components.push(component);
        return true;
    }

    // Returns true if component can be removed, false otherwise 
    // Mostly this would happen if the component being 
    // removed is a requirement for another
    /**
     * Removes the component
     * @param component Component to remove
     * @returns If component can be removed
     */
    public removeComponent(component: Component): boolean {
        return false;
    }
}
