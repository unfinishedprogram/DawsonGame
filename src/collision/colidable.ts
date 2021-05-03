import { HitboxPrimitive } from "./primitives/hitboxPrimitive";

export interface Collidable {
    collisionPrimitives: HitboxPrimitive[];
    collisionLayer: number;
    onCollision(colliidable: Collidable): void;
}