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
    velocityViewAngle: number = 0;
    inputViewAngle: number = 0;
    targetViewAngle: number = 0;
    angleOffset: number = Math.PI / 2;

    constructor(transform: Transform) {
        super(transform);
        this.VOXName = "shaman";
        //this.object3D = new Mesh(this.geometry, this.material);
    }
    
    update(deltaTime: number) {
        let input = this.controller.getInput();

        // Calculate velocity
        this.velocity.add(input.movementDirection.multiplyScalar(deltaTime * this.acceleration));
        this.velocity.multiplyScalar(this.drag);

        // Set position
        this.object3D.position.x += this.velocity.x;
        this.object3D.position.z -= this.velocity.y;

        // Calculate view angle
        this.velocityViewAngle = this.velocity.angle() + this.angleOffset;
        if (input.useGamepadViewVector) {
            if (input.gamepadViewDirection.x && input.gamepadViewDirection.y) {
                console.log('controlling');
                this.targetViewAngle = input.gamepadViewDirection.angle() + this.angleOffset;
            }
                
            else {
                console.log('not controlling');
                this.targetViewAngle = this.velocityViewAngle;
            }
                
        }


        // Set rotation
        this.object3D.rotation.y = this.interpolateAngle(this.object3D.rotation.y, this.targetViewAngle, 0.1);
    }
    private interpolateAngle(ang1: number, ang2: number, mu: number) : number {

        if (Math.abs(ang2 - ang1) > Math.PI) {
            if (ang2 > ang1)
                ang1 += Math.PI * 2;
            else
                ang1 -= Math.PI * 2;
        }

        let interpolated = (ang1 + ((ang2 - ang1) * mu));

        return interpolated;
    }
}
