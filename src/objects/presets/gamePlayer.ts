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
    shotDelay = 0.2;
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
    }
    
    shootBullet(direction:Vector3){
        globalThis.Subjects.addObjectSubject.notify(Action.ADD_OBJECT, new ChangeObject(new GameBullet(new Transform(this.object3D.position, direction))));
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
                this.targetViewAngle = Math.atan2(this.object3D.position.z - input.mouseLookPoint.z, input.mouseLookPoint.x - this.object3D.position.x) + this.angleOffset;
                this.interpolatedViewAngle = MoreMath.interpolateAngle(this.object3D.rotation.y, this.targetViewAngle, 0.1);
            }
        }
        
        this.object3D.rotation.y = this.interpolatedViewAngle;
        if (this.timeSinceShot > this.shotDelay) {
            if (input.shoot) {
                this.timeSinceShot = 0;
                this.shootBullet(new Vector3());
            }
        }
        else
            this.timeSinceShot += deltaTime;
    }
}