import { GameObject } from "../objects/gameObject";
import { Subject } from "../utils/subject";


export class RemoveObject {
    object: GameObject;
    constructor(object: GameObject){
        this.object = object;
    }
}

export class AddObject {
    object: GameObject;
    constructor(object: GameObject){
        this.object = object;
    }
}

export class RemoveObjectSubject extends Subject<RemoveObject>  {
    private listeners: Function[];
    constructor() {
        super();
        this.listeners = []; 
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

export class AddObjectSubject extends Subject<AddObject>  {
    private listeners: Function[];
    constructor() {
        super();
        this.listeners = []; 
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