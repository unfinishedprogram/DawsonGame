import { DynamicDrawUsage, PositionalAudio } from 'three';
import { action } from './action';

export abstract class Observer{

    abstract onNotify(action: Action) : void;

    onNotify(){
        switch(action.type){
            hit{
                damage;
                enemy;
                effects;
            }
            getSlapped{

            }
        }
    }

    Observer.notify()
}   