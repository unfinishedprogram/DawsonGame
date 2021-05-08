import { Vector2 } from "three";
import { HitboxPrimitive } from "./hitboxPrimitive";

export class CircleHitbox implements HitboxPrimitive {
    offset: Vector2;
    dimensions: Vector2;

    constructor(offset: Vector2, radius: number) {
        this.offset = offset;
        this.dimensions = new Vector2(radius, radius);
    }
}