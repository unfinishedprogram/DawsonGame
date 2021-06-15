import { Vector2 } from "three";
import { HitboxPrimitive } from "./hitboxPrimitive";

export class CircleHitbox extends HitboxPrimitive {
    radius: number;
    bounds: { min: Vector2, max: Vector2 };
    constructor(offset: Vector2, radius: number) {
        super("circle", offset);
        this.radius = radius;
        this.bounds = this.calculateBounds();
    }

    calculateBounds() {
        return {
            min: new Vector2(-this.radius, -this.radius),
            max: new Vector2(this.radius, this.radius)
        }
    }
}