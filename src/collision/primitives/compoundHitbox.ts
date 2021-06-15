import { MixOperation, Vector2 } from "three";
import { HitboxPrimitive } from "./hitboxPrimitive";

export class compoundHitbox extends HitboxPrimitive {
    primatives: HitboxPrimitive[];
    bounds: { min: Vector2, max: Vector2 };
    constructor(offset: Vector2, primatives: HitboxPrimitive[]) {
        super("compound", offset);
        
        this.primatives = primatives;

        this.bounds = this.calculateBounds();
    }

    calculateBounds(): { min: Vector2, max: Vector2 } {
        let newBounds = {
            min: new Vector2(),
            max: new Vector2()
        };

        this.primatives.forEach(primative => {
            if (primative.bounds.min.x + primative.offset.x < newBounds.min.x)
                newBounds.min.x = primative.bounds.min.x + primative.offset.x;
            if (primative.bounds.max.x + primative.offset.x > newBounds.max.x)
                newBounds.max.x = primative.bounds.max.x + primative.offset.x;
            
            if (primative.bounds.min.y + primative.offset.y < newBounds.min.y)
                newBounds.min.y = primative.bounds.min.y + primative.offset.y;
            if (primative.bounds.max.y + primative.offset.y > newBounds.max.y)
                newBounds.max.y = primative.bounds.max.y + primative.offset.y;
        })
        return newBounds;
    }
}