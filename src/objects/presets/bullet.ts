import { GameObject } from '../gameObject';
import { PlaneGeometry, MeshBasicMaterial, Vector2, Vector3, TetrahedronBufferGeometry, Euler} from 'three';
import { Controller } from '../../components/controller';
import { Transform } from '../../components/transform';
import { Action } from '../../utils/action';
import { ChangeObject } from '../../subjects/objectSubject';



export class GameBullet extends GameObject {
    material = new MeshBasicMaterial({ color: 0x00ff00 });
    geometry = new PlaneGeometry();
    controller = new Controller();

    transform: Transform;

    // Movement
    speed: number = 100;

    // View
    angleOffset: number = Math.PI / 2;
    // Delete this later
    constructor(transform: Transform) {
        super(transform.copy());
        this.transform = transform.copy();
       

        this.transform.rotation.subVectors(this.transform.position, globalThis.Input.projectedMousePos).normalize().multiplyScalar(-1);

        this.VOXName = "bullet";
    }
    
    update(deltaTime: number) {

        this.object3D.position.set(...this.transform.position.toArray());

        this.object3D.lookAt((this.transform.rotation.clone().multiplyScalar(-1).add(this.object3D.position)));

        this.object3D.scale.set(...this.transform.scale.toArray());


        let velocity = this.transform.rotation.clone();
        velocity.normalize().multiplyScalar(deltaTime*this.speed);
        this.transform.position.add(velocity);
        

        if( this.transform.position.x > 400 ||
            this.transform.position.x < -400 ||
            this.transform.position.z > 400 ||
            this.transform.position.z < -400 ){
                console.log("removing bullet");
                globalThis.Subjects.removeObjectSubject.notify(Action.REMOVE_OBJECT, new ChangeObject(this));
            }
    }
}
