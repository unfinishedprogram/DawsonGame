import { Mob, Stats } from '../mob';
import { Transform } from '../../components/transform';

let transform = new Transform();
let stats: Stats = {hp: 100, size: 1, speed: 10, attackMultiplier: 1}
let mob = new Mob(transform, stats, 'sword');

export { mob };
