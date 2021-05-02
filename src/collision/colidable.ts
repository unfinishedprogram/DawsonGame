import { Vector2 } from "three";
import { HitboxPrimitive } from "./primitives/hitboxPrimitive";

// Multiple hitmeshes 

export interface Collidable {
    /**
     * The number that represents the collision layer that the object is on
     */
    collisionLayer: number;
    /**
     * The list of numbers that represent with what collision layers the object should generate collision events
     */
    collisionLayerResponse: number[];

    collisionPrimitives: HitboxPrimitive[];

    onContact(collidedWith: Collidable): void;
}