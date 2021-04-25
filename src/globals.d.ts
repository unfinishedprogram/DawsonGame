import { CollisionSignleton } from './collision/collisionSingleton';
import { InputSingleton } from './controller/input';
import { AddObjectSubject } from './subjects/objectSubject';

declare global {
	var Input: InputSingleton;
	var Subjects: SubjectSingleton;
	var Collision: CollisionSignleton;
}
