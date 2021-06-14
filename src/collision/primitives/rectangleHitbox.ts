import { Vector2 } from "three";
import { HitboxPrimitive } from "./hitboxPrimitive";

export class RectangleHitbox extends HitboxPrimitive {
    offset: Vector2;
    dimensions: Vector2;

    constructor(offset: Vector2, dimensions: Vector2 | number) {
        super("rectangle", offset)
        this.offset = offset;
        this.dimensions = typeof dimensions == 'number' ? new Vector2(dimensions, dimensions) : dimensions;
    }

    calculateBounds() {
        return new Vector2(this.dimensions.x, this.dimensions.y);
    }
}