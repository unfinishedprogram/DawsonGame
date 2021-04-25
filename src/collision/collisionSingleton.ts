export class CollisionSignleton {
    private static _instance: CollisionSignleton;

    private constructor() { };

    public static get Instance() {
        return this._instance || (this._instance = new this());
    }
}