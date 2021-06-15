import { GameObject } from "../objects/gameObject";
import { HitboxPrimitive } from "./primitives/hitboxPrimitive";

export interface Collidable extends GameObject{
    collisionPrimitive: HitboxPrimitive;
    collisionLayer: number;
    onCollision(colliidable: Collidable): void;
}