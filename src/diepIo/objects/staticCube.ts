import { Transform } from '../../components/transform';
import { GameObject } from '../../objects/gameObject';

export class StaticCube extends GameObject {
    meshLoaded() {}
    transform: Transform;

    constructor(transform: Transform) {
        super(transform.copy(), "redCube");
        this.transform = transform.copy();
        setTimeout(()=>{
            this.object3D.position.set(...this.transform.position.toArray());
        }, 500)
    }
    
    update(deltaTime: number) {
        this.object3D.position.set(...this.transform.position.toArray());
    }
}
