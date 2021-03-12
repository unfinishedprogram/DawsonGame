import { GameObject } from '../gameObject';
import { PlaneGeometry, MeshBasicMaterial, Vector2, Vector3} from 'three';
import { Controller } from '../../components/controller';
import { Transform } from '../../components/transform';
import { MoreMath } from '../../utils/moreMath'
import { PCamera } from '../camera';



export class GamePlayer extends GameObject {
    material = new MeshBasicMaterial({ color: 0x00ff00 });
    geometry = new PlaneGeometry();
    controller = new Controller();

    // Movement
    velocity: Vector2 = new Vector2(0, 0);
    drag: number = 0.95;
    acceleration: number = 1;

    // View
    velocityViewAngle: number = 0;
    inputViewAngle: number = 0;
    targetViewAngle: number = 0;
    angleOffset: number = Math.PI / 2;

    constructor(transform: Transform) {
        super(transform);
        this.VOXName = "char";
    }
    
    shootBullet(direction:Vector3){
        
    }


    update(deltaTime: number) {
        let input = this.controller.getInput();

        // Calculate velocity
        this.velocity.add(input.movementDirection.multiplyScalar(deltaTime * this.acceleration));
        this.velocity.multiplyScalar(this.drag);

        // Set position
        this.object3D.position.x += this.velocity.x;
        this.object3D.position.z -= this.velocity.y;

        //this.object3D.position.set(...globalThis.Input.projectedMousePos.toArray());

        // Calculate view angle
        this.velocityViewAngle = this.velocity.angle() + this.angleOffset;

        if (input.useGamepadViewVector) {
            if (input.gamepadViewDirection.x && input.gamepadViewDirection.y)
                this.targetViewAngle = input.gamepadViewDirection.angle() + this.angleOffset;
            else
                this.object3D.lookAt(globalThis.Input.projectedMousePos);
                //this.targetViewAngle = this.velocityViewAngle;
        }

        // Set rotation
        //this.object3D.rotation.y = MoreMath.interpolateAngle(this.object3D.rotation.y, this.targetViewAngle, 0.1);
    }
}
