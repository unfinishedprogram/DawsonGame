import { GameObject } from '../gameObject';
import { PlaneGeometry, MeshBasicMaterial, Vector2, Vector3, TetrahedronBufferGeometry, Euler} from 'three';
import { Controller } from '../../components/controller';
import { Transform } from '../../components/transform';
import { Action } from '../../utils/action';
import { ChangeObject } from '../../subjects/objectSubject';



export class GameBullet extends GameObject {
    controller = new Controller();
    velocity : Vector3; 
    transform: Transform;

    // Movement
    speed: number = 100;

    // Delete this later
    constructor(transform: Transform) {
        super(transform.copy(), "bullet");
        this.transform = transform.copy();
        console.log(this.transform);
        this.velocity = new Vector3(Math.sin(this.transform.rotation.y), 0, Math.cos(this.transform.rotation.y));
        this.velocity.multiplyScalar(this.speed);
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
