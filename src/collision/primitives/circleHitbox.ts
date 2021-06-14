import { Vector2 } from "three";
import { HitboxPrimitive } from "./hitboxPrimitive";

export class CircleHitbox extends HitboxPrimitive {
    radius:number
    constructor(offset: Vector2, radius: number) {
        super("circle", offset);
        this.radius = radius;
    }

    calculateBounds():Vector2{
        return new Vector2(this.radius*2, this.radius*2)
    }
}