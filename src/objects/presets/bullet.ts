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
    speed: number = 1;
    direction: Vector3;

    // View
    angleOffset: number = Math.PI / 2;
    // Delete this later
    constructor(transform: Transform, position: Vector3, direction: Vector3) {
        super(transform);
        this.direction = direction;
        this.VOXName = "bullet";
    }
    
    update(deltaTime: number) {
        // Updatese position
        this.object3D.position.add(this.direction.multiplyScalar(deltaTime)); 
        if(this.object3D.position.x > 400){
            
        }
    }
}
