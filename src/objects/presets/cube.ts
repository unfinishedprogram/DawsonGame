import { GameObject } from '../gameObject';
import { PlaneGeometry, MeshBasicMaterial, Vector2} from 'three';
import { Mesh } from 'three';
import { Controller } from '../../components/controller';
import { Transform } from '../../components/transform';



export class Cube extends GameObject {
    material = new MeshBasicMaterial({ color: 0x00ff00 });
    geometry = new PlaneGeometry();
    controller = new Controller();

    velocity: Vector2 = new Vector2(0, 0);
    drag: number = 0.95;
    acceleration: number = 0.35;

    constructor(transform: Transform) {
        super(transform);
        this.object3D = new Mesh(this.geometry, this.material);
    }
    update(deltaTime: number) {
        let input = this.controller.getInput();

        console.log(input.movementDirection.length());

        this.velocity.add(input.movementDirection.multiplyScalar(deltaTime * this.acceleration));
        this.velocity.multiplyScalar(this.drag);

        this.object3D.position.x += this.velocity.x;
        this.object3D.position.y += this.velocity.y;

        //if (input.viewDirectionRelative.angle())
        //    this.object3D.rotation.z = input.viewDirectionRelative.angle(); 
        //this.object3D.rotation.z += input.mousePointerScreenPosition.x * 0.005 * deltaTime;
    }
}
