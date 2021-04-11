import { Action } from './action';
import { Observer } from './observer';
export class Subject<C extends any> {
    observers: Observer<C>[] = [];

    addObserver(observer:Observer<C>) {
        this.observers.push(observer);
    }

    removeObserver(observer:Observer<C>) {
        this.observers.splice( this.observers.indexOf(observer) , 1 );
    }

    notify(action:Action, info: C) {
        this.observers.forEach(observer => {
            observer.onNotify(action, info);
        });
    }
}
