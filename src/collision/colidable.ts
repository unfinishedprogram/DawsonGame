export interface Collidable {
    onEntityContactStart(collidedWith: Collidable): void;
    onEntityContactEnd(collidedWith: Collidable): void;
}