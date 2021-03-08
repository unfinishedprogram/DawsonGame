import { Action } from './action';
import { Observer } from './observer';
export class Subject {
    observers: Observer[] = [];


    addObserver(observer:Observer){
        this.observers.push(observer);
    }

    removeObserver(observer:Observer){
        this.observers.splice( this.observers.indexOf(observer) , 1 );
    }

    notify(action:Action){
        this.observers.forEach(observer => {
            observer.onNotify(action);
        });
    }
}