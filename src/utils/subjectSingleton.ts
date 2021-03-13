import { AddObjectSubject, RemoveObjectSubject } from "../subjects/objectSubject";

export class SubjectSingleton {
    private static _instance: SubjectSingleton;

    removeObjectSubject: RemoveObjectSubject = new RemoveObjectSubject();
    addObjectSubject: AddObjectSubject = new AddObjectSubject();
    
    private constructor() { }

    public static get Instance() {
        // do you need arguments? Make it a regular static method instead.
        return this._instance || (this._instance = new this());
    }
}