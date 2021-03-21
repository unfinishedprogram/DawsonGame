import { GameObject } from '../gameObject';
import { PlaneGeometry, MeshBasicMaterial, Vector2, Vector3, Euler} from 'three';
import { Transform } from '../../components/transform';
import { ChangeObject } from '../../subjects/objectSubject';
import { GameBullet } from './bullet';
import { Action } from '../../utils/action';
import { PlayerController } from '../../components/playerController';
import { MoreMath } from '../../utils/moreMath';

export class GamePlayer extends GameObject {
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
    
    shootBullet(direction: number){
        let rotationAngle = new Vector3(0, 0, 0)
        //.subVectors(this.object3D.position, globalThis.Input.getProjectedMousePosition()).normalize().multiplyScalar(-1);


        let bulletTransform = new Transform(this.object3D.position);
        bulletTransform.rotation.setY(direction)
        let bullet = new GameBullet(bulletTransform);
        globalThis.Subjects.addObjectSubject.notify(Action.ADD_OBJECT, new ChangeObject(bullet));
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
        this.interpolatedViewAngle = MoreMath.interpolateAngle(this.object3D.rotation.y, this.targetViewAngle, 0.075);

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
                this.timeSinceShot = 1;// Change this to zero to fix shoot speed
                this.shootBullet(this.targetViewAngle + (Math.random())/2.5 - 0.2);
            }
        }
        else
            this.timeSinceShot += deltaTime;
    }
}

/*
    Please make it compile
    The direction of the bullet should be a number and not a Vector3 because all the physics will be done on a plane, so we do not care about other 2 rotation axes
    The bullet should go in the specified direction and not the cursor point location
    PLEASE DO NOT BREAK ANYTHING HERE, ALL OF IT JUST WORKS
*/