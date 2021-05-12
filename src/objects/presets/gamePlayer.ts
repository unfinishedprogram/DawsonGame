import { GameObject } from '../gameObject';
import { Vector2, Vector3 } from 'three';
import { Transform } from '../../components/transform';
import { ChangeObject } from '../../subjects/objectSubject';
import { GameBullet } from './bullet';
import { Action } from '../../utils/action';
import { PlayerController } from '../../components/playerController';
import { MoreMath } from '../../utils/moreMath';
import { Collidable } from '../../collision/colidable';
import { HitboxPrimitive } from '../../collision/primitives/hitboxPrimitive';
import { CircleHitbox } from '../../collision/primitives/circleHitbox';

export class GamePlayer extends GameObject implements Collidable {
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

    collisionPrimitives: HitboxPrimitive[] = [ new CircleHitbox(new Vector2(0, 0), 25) ];
    collisionLayer: number = 0;

    constructor(transform:Transform) {
        super(transform, "shaman_new");
    }

    onCollision(colliidable: Collidable): void {
        console.log('Collided');
    }
    
    meshLoaded(){};

    shootBullet(direction: number) {
        let bulletTransform = new Transform(this.object3D.position);
        bulletTransform.rotation.setY(direction + Math.PI / 2);
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

                this.shootBullet(this.targetViewAngle + (Math.random()) / 2.5 - 0.2);
                /*
                this.shootBullet(this.targetViewAngle + (Math.random()) / 2.5 - 0.2);
                this.shootBullet(this.targetViewAngle + (Math.random()) / 2.5 - 0.2);
                this.shootBullet(this.targetViewAngle + (Math.random()) / 2.5 - 0.2);
                this.shootBullet(this.targetViewAngle + (Math.random()) / 2.5 - 0.2);
                this.shootBullet(this.targetViewAngle + (Math.random()) / 2.5 - 0.2);
                this.shootBullet(this.targetViewAngle + (Math.random()) / 2.5 - 0.2);
                this.shootBullet(this.targetViewAngle + (Math.random()) / 2.5 - 0.2);
                this.shootBullet(this.targetViewAngle + (Math.random()) / 2.5 - 0.2);
                */
            }
        }
        else
            this.timeSinceShot += deltaTime;
    }
}