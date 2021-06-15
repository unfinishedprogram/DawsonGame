import { Vector2 } from "three";
import { CircleHitbox } from "./circleHitbox";
import { RectangleHitbox } from "./rectangleHitbox";

export type HitboxType =
    "circle" |
    "rectangle" |
    "compound";

export abstract class HitboxPrimitive {
    type: HitboxType;
    offset: Vector2;
    abstract bounds: { min: Vector2, max: Vector2 };

    constructor(type: HitboxType, offset: Vector2) {
        this.type = type;
        this.offset = offset;
    }
    
    abstract calculateBounds(): { min: Vector2, max: Vector2 };

    setBounds(): void {
        this.bounds = this.calculateBounds();
    }

    static boundingOverlap(objectA: HitboxPrimitive, offsetA: Vector2, objectB: HitboxPrimitive, offsetB: Vector2) {

        let globalBoundsA = {
            min: new Vector2().copy(objectA.bounds.min).add(offsetA).add(objectA.offset),
            max: new Vector2().copy(objectA.bounds.max).add(offsetA).add(objectA.offset)
        }

        let globalBoundsB = {
            min: new Vector2().copy(objectB.bounds.min).add(offsetB).add(objectB.offset),
            max: new Vector2().copy(objectB.bounds.max).add(offsetB).add(objectB.offset)
        }

        if (globalBoundsA.min.x >= globalBoundsB.max.x)
            return false;
        if (globalBoundsA.max.x <= globalBoundsB.min.x)
            return false;
        if (globalBoundsA.min.y >= globalBoundsB.max.y)
            return false;
        if (globalBoundsA.max.y <= globalBoundsB.min.y)
            return false;
        
        return true;
    }

    static isCollidingWith(objectA: HitboxPrimitive, offsetA: Vector2, objectB: HitboxPrimitive, offsetB: Vector2) {
        if (!HitboxPrimitive.boundingOverlap(objectA, offsetA, objectB, offsetB)) return false;
        if (objectB.type == "rectangle" && objectA.type == "rectangle") return true;

        if (objectB.type == "circle" && objectA.type == "circle")
            return HitboxPrimitive.circleCircleCollision(objectA as CircleHitbox, offsetA, objectB as CircleHitbox, offsetB);
        
        if (objectA.type != objectB.type) {
            if (objectB.type == "circle" && objectA.type == "rectangle") {
                return HitboxPrimitive.rectCircleCollision(objectB as CircleHitbox, offsetB, objectA as RectangleHitbox, offsetA);
            }
            else if (objectB.type == "rectangle" && objectA.type == "circle") {
                return HitboxPrimitive.rectCircleCollision(objectA as CircleHitbox, offsetA, objectB as RectangleHitbox, offsetB);
            }
        }

        // Compound > Circle
        // Compound > Rect
        // Compound > Compound
    }

    static rectCircleCollision(circle: CircleHitbox, circleOffset: Vector2, rect: RectangleHitbox, rectOffset: Vector2): boolean {
        let RectX = rect.bounds.min.x + rectOffset.x + rect.offset.x;
        let RectY = rect.bounds.min.y + rectOffset.y + rect.offset.y;
                
        let RectWidth = rect.bounds.max.x - rect.bounds.min.x;
        let RectHeight = rect.bounds.max.y - rect.bounds.min.y;

        let CircleX = circle.offset.x;
        let CircleY = circle.offset.y;

        let CircleRadius = circle.radius;

        let DeltaX = CircleX - Math.max(RectX, Math.min(CircleX, RectX + RectWidth));
        let DeltaY = CircleY - Math.max(RectY, Math.min(CircleY, RectY + RectHeight));

        return (DeltaX ** 2 + DeltaY ** 2) < (CircleRadius ** 2);
            
    }

    static circleCircleCollision(objectA: CircleHitbox, offsetA: Vector2, objectB: CircleHitbox, offsetB: Vector2): boolean {
        let pos1 = new Vector2().copy(objectA.offset).add(offsetA);
        let pos2 = new Vector2().copy(objectB.offset).add(offsetB);

        let distance: number = pos1.distanceToSquared(pos2);
            
        let radSumSquared: number = (objectB.radius + objectA.radius) ** 2;
            
        return (distance < radSumSquared);
    }
}