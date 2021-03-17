import { GameObject } from '../gameObject';
import { PlaneGeometry, MeshBasicMaterial, Vector2, Vector3} from 'three';
import { Transform } from '../../components/transform';
import { ChangeObject } from '../../subjects/objectSubject';
import { GameBullet } from './bullet';
import { Action } from '../../utils/action';
import { PlayerController } from '../../components/playerController';
import { MoreMath } from '../../utils/moreMath';

export class GamePlayer extends GameObject {
    material = new MeshBasicMaterial({ color: 0x00ff00 });
    geometry = new PlaneGeometry();
    controller = new PlayerController();
    shotDelay = 1;
    timeSinceShot = 0;
    // Movement
    velocity: Vector2 = new Vector2(0, 0);
    drag: number = 0.95;
    acceleration: number = 1;

    // View
    targetViewAngle: number = 0;
    interpolatedViewAngle: number = 0;
    angleOffset: number = Math.PI / 2;

    constructor(transform: Transform) {
        super(transform);
        this.VOXName = "shaman";
        this.object3D.up = new Vector3(0,1,0);
    }
    
    shootBullet(direction:Vector3){
        globalThis.Subjects.addObjectSubject.notify(Action.ADD_OBJECT, new ChangeObject(new GameBullet(new Transform(this.object3D.position, this.object3D.rotation.toVector3()))));
    }


    update(deltaTime: number) {
        const input = this.controller.getInput();

        // Calculate velocity
        this.velocity.add(input.movementDirection.multiplyScalar(this.acceleration * deltaTime));
        this.velocity.multiplyScalar(this.drag);

        // Set position
        this.object3D.position.x += this.velocity.x;
        this.object3D.position.z -= this.velocity.y;

        // Calculte target view angle and rotate the object smoothly to it
        this.targetViewAngle = this.velocity.angle() + this.angleOffset;
        this.interpolatedViewAngle = MoreMath.interpolateAngle(this.object3D.rotation.y, this.targetViewAngle, 0.035);

        if (globalThis.Input.getUseGamepad()) {
            if (input.gamepadLookDirection) {
                if (input.gamepadLookDirection.x || input.gamepadLookDirection.y) {
                    this.targetViewAngle = input.gamepadLookDirection.angle() + this.angleOffset;
                    this.interpolatedViewAngle = MoreMath.interpolateAngle(this.object3D.rotation.y, this.targetViewAngle, 0.1);
                }
            }
        }
        
        else {
            if (input.mouseLookPoint) {
                // TODO make look at function
            }
        }
        
        // this.object3D.rotation.y = this.interpolatedViewAngle;
        
        /*
        // Calculate view angle
        if (globalThis.Input.getUseGamepad()) {
            if (input.gamepadLookDirection)
                if (input.gamepadLookDirection.x  && input.gamepadLookDirection.y)
                    this.targetViewAngle = input.gamepadLookDirection.angle() + this.angleOffset;
        }
        else {
            this.object3D.up = new Vector3(0,1,0);
            this.object3D.lookAt(globalThis.Input.getProjectedMousePosition());
            //this.targetViewAngle = this.velocityViewAngle;
        }
        */

        /*
        
        // Calculate velocity
        //this.object3D.position.set(...globalThis.Input.projectedMousePos.toArray());

        // Calculate view angle


        // Shoot bullets if mouse is down
        if(this.timeSinceShot > this.shotDelay){
            if(globalThis.Input.isKeyboardKeyDown("Space")) {
                this.timeSinceShot = 0;
                this.shootBullet(this.object3D.rotation.toVector3());
            }
        } else {
            this.timeSinceShot += deltaTime;
        }

        */
    }
}