import { Collidable } from "./colidable";

export class CollisionSignleton {
    private static _instance: CollisionSignleton;
    private static collisionLayers: Collidable[][];

    private constructor() { };
    public static get Instance() {
        return this._instance || (this._instance = new this());
    }
}