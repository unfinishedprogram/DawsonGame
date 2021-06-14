import { MixOperation, Vector2 } from "three";
import { HitboxPrimitive } from "./hitboxPrimitive";

export class compoundHitbox extends HitboxPrimitive {
    primatives: HitboxPrimitive[];
    
    constructor(offset: Vector2, primatives: HitboxPrimitive[]) {
        super("compound", offset);
        this.primatives = primatives;
    }

    calculateBounds(): Vector2{
        let minX = 0, minY = 0, maxX = 0, maxY = 0;
        this.primatives.forEach(primative => {
            if (primative.bounds.x < minX) minX = primative.bounds.x;
            if (primative.bounds.x > maxX) maxX = primative.bounds.x;

            if (primative.bounds.y < minY) minY = primative.bounds.y;
            if (primative.bounds.y > maxY) maxY = primative.bounds.y;
        })
        return new Vector2()
    }
}