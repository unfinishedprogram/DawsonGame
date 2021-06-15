import { Vector2 } from "three";
import { CircleHitbox } from "./circleHitbox";
import { HitboxPrimitive } from "./hitboxPrimitive";

export class RectangleHitbox extends HitboxPrimitive {
    offset: Vector2;
    dimensions: Vector2;
    bounds: { min: Vector2, max: Vector2 };

    constructor(offset: Vector2, dimensions: Vector2 | number) {
        super("rectangle", offset)
        this.offset = offset;
       
        this.dimensions = typeof dimensions == 'number' ? new Vector2(dimensions, dimensions) : dimensions;
        
        this.bounds = this.calculateBounds();
    }

    calculateBounds(): { min: Vector2, max: Vector2 } {
        return {
            min: new Vector2(-this.dimensions.x/2, -this.dimensions.y/2),
            max: new Vector2(this.dimensions.x/2, this.dimensions.y/2)
        }
    }

    isCollidingWith(selfOffset: Vector2, other: HitboxPrimitive, otherOffset: Vector2): boolean {
        
        let newOtherOffset = new Vector2().copy(other.offset).add(otherOffset)
        let newSelfOffset = new Vector2().copy(this.offset).add(selfOffset)

        switch (other.type) {
            case "rectangle":
                return this.boundingOverlap(selfOffset, other, otherOffset)
            
            case "circle":
                let RectX = this.bounds.min.x + selfOffset.x + this.offset.x;
                let RectY = this.bounds.min.y + selfOffset.y + this.offset.y;
                
                let RectWidth = this.bounds.max.x - this.bounds.min.x;
                let RectHeight = this.bounds.max.y - this.bounds.min.y;

                let CircleX = other.offset.x;
                let CircleY = other.offset.y;

                let CircleRadius = (other as CircleHitbox).radius;
                let DeltaX = CircleX - Math.max(RectX, Math.min(CircleX, RectX + RectWidth));
                let DeltaY = CircleY - Math.max(RectY, Math.min(CircleY, RectY + RectHeight));

                return (DeltaX * DeltaX + DeltaY * DeltaY) < (CircleRadius * CircleRadius);
            
            case "compound":

        }
        return true;
    }
}
