import { Vector2 } from "three";

export interface Collidable {
    /**
     * The number that represents the collision layer that the object is on
     */
    collisionLayer: number;
    /**
     * The list of numbers that represent with what collision layers the object should generate collision events
     */
    collisionLayerResponse: number[];
    /**
     * The size of the collision (from the center)
     */
    collisionSize: Vector2 | number;

    onContactStart(collidedWith: Collidable): void;
    onContactContinue(Collidable: Collidable): void;
    onContactEnd(collidedWith: Collidable): void;
}