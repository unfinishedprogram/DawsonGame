
import { Vector3 } from 'three';
import { Transform } from '../../components/transform';
import { Action } from '../../utils/action';
import { ChangeObject } from '../../subjects/objectSubject';
import { GameObject } from '../../objects/gameObject';



export class DiepBullet extends GameObject {
    velocity : Vector3; 
    transform: Transform;
    lifeTime: number;

    // Delete this later
    constructor(transform: Transform, velocity:number, lifespan:number) {
       
        super(transform.copy(), "sphereShot");
        this.lifeTime = lifespan;
        this.transform = transform.copy();
        this.velocity = new Vector3(Math.sin(this.transform.rotation.y), 0, Math.cos(this.transform.rotation.y));
        this.velocity.multiplyScalar(velocity);
    }

    meshLoaded(){

    };

    update(deltaTime: number) {
        this.lifeTime-=deltaTime;
        this.object3D.position.set(...this.transform.position.toArray());
        this.object3D.rotation.set(...this.transform.rotation.toArray());
        this.object3D.scale.set(...this.transform.scale.toArray());
       
        this.transform.position.add(this.velocity.clone().multiplyScalar(deltaTime));
        
        if( this.lifeTime <= 0 ){
            globalThis.Subjects.removeObjectSubject.notify(Action.REMOVE_OBJECT, new ChangeObject(this));
        }
    }
}
