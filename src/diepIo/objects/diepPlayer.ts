
import { Vector2, Vector3 } from 'three';
import { Transform } from '../../components/transform';
import { PlayerController } from '../../components/playerController';
import { MoreMath } from '../../utils/moreMath';
import { GameObject } from '../../objects/gameObject';
import { Action } from '../../utils/action';
import { ChangeObject } from '../../subjects/objectSubject';
import { DiepBullet } from './diepBullet';

export class DiepPlayer extends GameObject {


    // Player stats
    speed:number;
    bulletVelocity:number;
    fireRate:number;
    damage:number;
    accuracy:number;
    range:number;
    bulletLifetime:number;

    controller = new PlayerController();

    shotDelay = 0.2;
    timeSinceShot = 0;
    // Movement
    velocity: Vector2 = new Vector2(0, 0);
    drag: number = 0.95;
    // View
    targetViewAngle: number = 0;
    interpolatedViewAngle: number = 0;

    constructor(transform:Transform) {
        super(transform, "diep");
        this.speed = 1;
        this.damage = 1;
        this.accuracy = 1;
        this.range = 100;
        this.bulletVelocity = 100;
        this.fireRate = 100;
        this.bulletLifetime = 2;
    }
    
    meshLoaded(){};

    shootBullet(direction: number) {
        let bulletTransform = new Transform(this.object3D.position);
        this.applyRecoil(direction, 0.2);
        bulletTransform.rotation.setY(direction + Math.PI / 2);
        let bullet = new DiepBullet(bulletTransform, this.bulletVelocity, this.bulletLifetime);
        globalThis.Subjects.addObjectSubject.notify(Action.ADD_OBJECT, new ChangeObject(bullet));

    }

    applyRecoil(direction:number, strength:number){
        let newDir = new Vector2(-Math.sin(direction + Math.PI / 2), Math.cos(direction + Math.PI / 2));
        this.velocity.add(newDir.multiplyScalar(strength));
    }

    update(deltaTime: number) {
        const input = this.controller.getInput();

        // Calculate velocity
        this.velocity.add(input.movementDirection.multiplyScalar(this.speed * deltaTime));
        this.velocity.multiplyScalar(this.drag);

        // Set position
        this.object3D.position.x += this.velocity.x;
        this.object3D.position.z -= this.velocity.y;

        // Calculte target view angle and rotate the object smoothly to it
        this.targetViewAngle = this.velocity.angle();
        this.interpolatedViewAngle = MoreMath.interpolateAngle(this.object3D.rotation.y, this.targetViewAngle, 0.075);

        if (globalThis.Input.getUseGamepad()) {
            if (input.gamepadLookDirection) {
                if (input.gamepadLookDirection.x || input.gamepadLookDirection.y) {
                    this.targetViewAngle = input.gamepadLookDirection.angle();
                    this.interpolatedViewAngle = MoreMath.interpolateAngle(this.object3D.rotation.y, this.targetViewAngle, 0.1);
                }
            }
        }
        else {
            if (input.mouseLookPoint) {
                this.targetViewAngle = Math.atan2(this.object3D.position.z - input.mouseLookPoint.z, input.mouseLookPoint.x - this.object3D.position.x);
                this.interpolatedViewAngle = MoreMath.interpolateAngle(this.object3D.rotation.y, this.targetViewAngle, 0.1);
            }
        }
        
        this.object3D.rotation.y = this.interpolatedViewAngle;
        if (this.timeSinceShot > this.shotDelay) {
            if (input.shoot) {
                this.timeSinceShot = 0;// Change this to zero to fix shoot speed
                this.shootBullet(this.targetViewAngle + (Math.random() -0.5) / 1);
            }
        }
        else
            this.timeSinceShot += deltaTime;
    }
}