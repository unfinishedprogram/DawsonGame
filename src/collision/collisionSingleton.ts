export class CollisionSignleton {
    /* TODO 
     * Implementation ideas:
     * - Pass the array of all the collidable objects here inside the singleto?
     * - Create an object that can be placed in the scene. This is going to be a collision handler that has an update() which checks for collisions and sends the alerts
     * - Doing everything in the scene (who needs oop anyway?)
     * 
     * Collision response lookup:
     * - Each object type is placed on the separate layer. So, we will need to define the collision response look up that will affect all the objects. Maybe creating something that will let us set it during the game initialization instead of hardcoding it here?
     * - Making each object a separate look up array, so we can manually select for each object
     * - It alraedy tells us if the collision response is unidirection (in one or the other direction) or if its bidirectional
     * (For example: the player needs to know if he collided with the wall, but the wall does not care - unidirectional from wall to player)
     * (For example: the player needs to know if he collided with the buller, and the bullet needs to know if it collided with the player - bidirectional between player and bullet)
    */


    private static _instance: CollisionSignleton;
    private static collisionResponseLookUp: number[][] = [
        [0, 1], // Player can collide with other players and walls
        [0]     // Walls can only collide with players
    ];

    private constructor() { };

    public static get Instance() {
        return this._instance || (this._instance = new this());
    }


}