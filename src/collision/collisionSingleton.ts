import { Vector2, Vector3 } from "three";
import { GameObject } from "../objects/gameObject";
import { Collidable } from "./colidable";
import { HitboxPrimitive } from "./primitives/hitboxPrimitive";

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
        for (let i = 0; i < this.collidables.length; i++) {
            // Go through each collidable inside this collision layer

            let responseToCollisionLayers = this.collisionResponseLookUp[i];

            for (let collidable of this.collidables[i]) {
                // Get the appropriate responses to other collision layers for the object           
                // Go through each layer inside the layers that the object responses
                for (let responseLayer of responseToCollisionLayers) {
                    // Get all the objects that the collidable should check the collisions against
                    let targetCollisionLayer : Collidable[] = this.collidables[responseLayer];
                    
                    // Go through each object and check for collision
                    for (let targetObject of targetCollisionLayer) {
                        if (this.doesCollidableCollideWithTarget(collidable, targetObject))
                            collidable.onCollision(targetObject);
                    }
                }
            }
        }
    }

    public doesCollidableCollideWithTarget(object : Collidable, target : Collidable) : boolean {
        if (!this.collisionResponseLookUp[object.collisionLayer].includes(target.collisionLayer))
            return false;

        let objectO = object;
        let targetO = target;

        // Go through each primitive inside both objects
        for (let objectPrim of object.collisionPrimitives) {
            for (let targetPrim of target.collisionPrimitives) {
                if (this.doPrimitivesOverlap(objectPrim, objectO.object3D.position, targetPrim, targetO.object3D.position))
                    return true;
            }
        }

        return false;
    }

    private doPrimitivesOverlap(prim1 : HitboxPrimitive, obj1Pos : Vector3, prim2 : HitboxPrimitive, obj2Pos : Vector3) : boolean {
        let prim1Pos : Vector2 = new Vector2(obj1Pos.x, obj1Pos.z);
        prim1Pos.add(prim1.offset);

        let prim2Pos : Vector2 = new Vector2(obj2Pos.x, obj2Pos.z);
        prim2Pos.add(prim2.offset);
        
        let distance : number = prim1Pos.distanceTo(prim2Pos);

        let overlapDistance : number = prim1.dimensions.length() + prim2.dimensions.length();
        
        return (distance < overlapDistance);
    }
}