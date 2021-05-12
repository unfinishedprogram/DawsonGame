import { GameObject } from '../gameObject';
import { Vector2, Vector3 } from 'three';
import { Controller } from '../../components/controller';
import { Transform } from '../../components/transform';
import { Action } from '../../utils/action';
import { ChangeObject } from '../../subjects/objectSubject';
import { Collidable } from '../../collision/colidable';
import { HitboxPrimitive } from '../../collision/primitives/hitboxPrimitive';
import { RectangleHitbox } from '../../collision/primitives/rectangleHitbox';



export class GameBullet extends GameObject implements Collidable {
    controller = new Controller();
    velocity : Vector3; 
    transform: Transform;

    // Movement
    speed: number = 5;

    // Delete this later
    constructor(transform: Transform) {
        super(transform.copy(), "bullet");
        this.transform = transform.copy();
        //console.log(this.transform);
        this.velocity = new Vector3(Math.sin(this.transform.rotation.y), 0, Math.cos(this.transform.rotation.y));
        this.velocity.multiplyScalar(this.speed);
    }
    collisionPrimitives: HitboxPrimitive[] = [ new RectangleHitbox(new Vector2(), 10) ];
    collisionLayer: number = 1;

    onCollision(colliidable: Collidable): void {
        throw new Error('Method not implemented.');
    }

    meshLoaded(){

    };

    update(deltaTime: number) {
        this.object3D.position.set(...this.transform.position.toArray());
        this.object3D.rotation.set(...this.transform.rotation.toArray());
        this.object3D.scale.set(...this.transform.scale.toArray());
       
        this.transform.position.add(this.velocity.clone().multiplyScalar(deltaTime));
        
        if( this.transform.position.x > 300 || this.transform.position.x < -300 || this.transform.position.z > 150 || this.transform.position.z < -150 ){
            globalThis.Subjects.removeObjectSubject.notify(Action.REMOVE_OBJECT, new ChangeObject(this));
        }
    }
}
