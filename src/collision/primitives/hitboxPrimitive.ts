import { Vector2 } from "three";

export type HitboxType =
    "circle" |
    "rectangle" |
    "compound";

export abstract class HitboxPrimitive {
    type: HitboxType;
    offset: Vector2;
    bounds: Vector2;

    constructor(type: HitboxType, offset: Vector2) {
        this.type = type;
        this.offset = offset;
        this.bounds = new Vector2(0,0);
    }
    
    abstract calculateBounds(): Vector2;

    setBounds(): void {
        this.bounds = this.calculateBounds();
    }
}