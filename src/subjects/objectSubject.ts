import { GameObject } from "../objects/gameObject";
import { Action } from "../utils/action";
import { Subject } from "../utils/subject";

// TO BE REMOVED 
export class ChangeObject {
    object: GameObject;
    /**
     * Initializes gameObject removal 
     * @param object The gameObject to be removed
     */
    constructor(object: GameObject) {
        this.object = object;
    }
}

export class RemoveObjectSubject extends Subject<ChangeObject> {
    private listeners: Function[];
    constructor() {
        super();
        this.listeners = [
            this.removeObject
        ]; 
    }

    public removeObject(that:AddObjectSubject, object:ChangeObject) {
        that.notify(Action.REMOVE_OBJECT, object);
    }

    public registerListener(f: Function) {
        if (!this.listeners.filter(a => f === a)) {
            f();
            this.listeners.push(f);
        } else {
            console.error("Trying to add existing event listener!");
        }
    }
}

export class AddObjectSubject extends Subject<ChangeObject> {
    private listeners: Function[];
    constructor() {
        super();
        this.listeners = [
            this.addObject
        ]; 
    }
    public addObject(that:AddObjectSubject, object:ChangeObject) {
        that.notify(Action.ADD_OBJECT, object);
    }


    public registerListener(f: Function) {
        if (!this.listeners.filter(a => f === a)) {
            f();
            this.listeners.push(f);
        } else {
            console.error("Trying to add existing event listener!");
        }
    }
}