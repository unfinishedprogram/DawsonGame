import { Vector2 } from "three";
import { HitboxPrimitive } from "./hitboxPrimitive";

export class CircleHitbox implements HitboxPrimitive {
    offset: Vector2;
    dimensions: Vector2;

    constructor(offset: Vector2, dimensions: Vector2 | number) {
        this.offset = offset;
        if (typeof dimensions == 'number')
            this.dimensions = new Vector2(dimensions, dimensions);
        else
            this.dimensions = dimensions;
    }
}