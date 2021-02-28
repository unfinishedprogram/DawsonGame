import { GameObject } from '../gameObject';
import { PlaneGeometry, MeshBasicMaterial, Vector2} from 'three';
import { Mesh } from 'three';
import { Controller } from '../../components/controller';
import { Transform } from '../../components/transform';



export class Cube extends GameObject {
    material = new MeshBasicMaterial({ color: 0x00ff00 });
    geometry = new PlaneGeometry();
    controller = new Controller();

    // Movement
    velocity: Vector2 = new Vector2(0, 0);
    drag: number = 0.95;
    acceleration: number = 0.35;

    // View
    viewAngle: number = 0;
    targetViewAngle: number = 0;

    constructor(transform: Transform) {
        super(transform);
        this.VOXName = "shaman";
        //this.object3D = new Mesh(this.geometry, this.material);
    }
    
    update(deltaTime: number) {
        let input = this.controller.getInput();

        // TODO
        //this.targetViewAngle = input.viewDirectionRelative.angle();
        //this.object3D.rotation.z = this.interpolateAngle(this.object3D.rotation.z, this.targetViewAngle, 0.1);
        //console.log(this.targetViewAngle + " --- " + input.viewDirectionRelative.x + " " + input.viewDirectionRelative.y);

        this.velocity.add(input.movementDirection.multiplyScalar(deltaTime * this.acceleration));
        this.velocity.multiplyScalar(this.drag);

        this.object3D.position.x += this.velocity.x;
        this.object3D.position.z -= this.velocity.y;
    }
    private interpolateAngle(ang1: number, ang2: number, mu: number) : number {
        let cos = (1 - mu) * Math.cos(ang1) + mu * Math.cos(ang2);
        let sin = (1 - mu) * Math.sin(ang1) + mu * Math.sin(ang2);

        return Math.atan2(sin, cos);
    }
}
