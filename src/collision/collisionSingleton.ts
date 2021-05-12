import { GameObject } from "../objects/gameObject";
import { Collidable } from "./colidable";

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
    private collisionResponseLookUp: number[][] = [];
    private collidables: Collidable[][] = [];

    private constructor() { };

    public static get Instance() {
        return this._instance || (this._instance = new this());
    }

    public modifyLayerResponseLookup(layer : number, response : number[]) : void {
        this.collisionResponseLookUp[layer] = response;
    }

    public addCollidable(collidable : Collidable) {
        if (!this.collidables[collidable.collisionLayer])
            this.collidables[collidable.collisionLayer] = [];

        this.collidables[collidable.collisionLayer].push(collidable);
    }
    
    public removeCollidable(collidable : Collidable) {
        if (!this.collidables[collidable.collisionLayer])
            return;

        let index = this.collidables[collidable.collisionLayer].indexOf(collidable);
        if (index > -1)
            this.collidables[collidable.collisionLayer].splice(index);
    }

    public updateCollision() {
        // Go through each collision layer
        if (!this.collidables)
            return;

        for (let collisionLayer of this.collidables) {
            // Go through each object
            if (!collisionLayer)
                continue;

            for (let collidable of collisionLayer) {
                // Get the appropriate responses for the object
                let response : number[] = this.collisionResponseLookUp[collidable.collisionLayer];
                if (!response)
                    continue;
                
                for (let targetLayer of response) {
                    let targetCollisionLayer : Collidable[] = this.collidables[targetLayer];
                    if (!targetCollisionLayer)
                        continue;
                    
                    for (let targetObject of targetCollisionLayer) {
                        let oCollidable = collidable as unknown as GameObject;
                        let oTargetObject = targetObject as unknown as GameObject;
                        let distance : number = oCollidable.object3D.position.distanceTo(oTargetObject.object3D.position);
                        // TODO implement actual check if the objects collided
                        if (distance < 5)
                            collidable.onCollision(targetObject);
                    }
                    
                }
            }
        }
    }
}