import { Action } from './action';

export abstract class Observer<C extends any>{
    abstract onNotify(action: Action, info: C) : void;
}

export class CombatObserver extends Observer<number> {
    onNotify(action: Action, info: number) {
        console.log(`action: ${action}, info: ${info}`); 
    };
}
