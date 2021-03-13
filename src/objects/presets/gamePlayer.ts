import { GameObject } from '../gameObject';
import { PlaneGeometry, MeshBasicMaterial, Vector2, Vector3} from 'three';
import { Controller } from '../../components/controller';
import { Transform } from '../../components/transform';
import { ChangeObject } from '../../subjects/objectSubject';
import { GameBullet } from './bullet';
import { Action } from '../../utils/action';



export class GamePlayer extends GameObject {
    material = new MeshBasicMaterial({ color: 0x00ff00 });
    geometry = new PlaneGeometry();
    controller = new Controller();
    shotDelay = 1;
    timeSinceShot = 0;
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
        globalThis.Subjects.addObjectSubject.notify(Action.ADD_OBJECT, new ChangeObject(new GameBullet(new Transform(this.object3D.position, this.object3D.rotation.toVector3()))));
    }


    update(deltaTime: number) {
        let input = this.controller.getInput();

        // Calculate velocity
        this.velocity.add(input.movementDirection.multiplyScalar(this.acceleration*deltaTime));
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
                this.object3D.up = new Vector3(0,1,0);
                this.object3D.lookAt(globalThis.Input.projectedMousePos);
                //this.targetViewAngle = this.velocityViewAngle;
        }

        // Shoot bullets if mouse is down
        if(this.timeSinceShot > this.shotDelay){
            if(globalThis.Input.isKeyDown("Space")) {
                this.timeSinceShot = 0;
                this.shootBullet(this.object3D.rotation.toVector3());
            }
        } else{
            this.timeSinceShot += deltaTime;
        }
    }
}