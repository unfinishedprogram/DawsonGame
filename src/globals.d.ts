import { InputSingleton } from './controller/input';
import { AddObjectSubject } from './subjects/objectSubject';
declare global {
	var Input: InputSingleton;
	var Subjects: SubjectSingleton;
}
