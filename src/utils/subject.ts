import { Action } from './action';
import { Observer, CombatObserver } from './observer';
export class Subject<C extends any> {
    observers: Observer<C>[] = [];

    addObserver(observer:Observer<C>){
        this.observers.push(observer);
    }

    removeObserver(observer:Observer<C>){
        this.observers.splice( this.observers.indexOf(observer) , 1 );
    }

    notify(action:Action, info: C){
        this.observers.forEach(observer => {
            observer.onNotify(action, info);
        });
    }
}

let combatSubject: Subject<number> = new Subject();
combatSubject.addObserver(new CombatObserver());
combatSubject.notify(Action.DO_DAMAGE, 10);
