export class GamepadListener {
    gamepads: Gamepad[];
    buttonUp: Function;
    buttonDown: Function;
    stickMove: Function;

    constructor(buttonUp: Function, buttonDown: Function, stickMove: Function) {
        this.gamepads = [];
            
        this.buttonUp = buttonUp;
        this.buttonDown = buttonDown;
        this.stickMove = stickMove;
    }

    update() {
        let newGamepads = Object.values(navigator.getGamepads());

        newGamepads
            .filter((newGamepad) : newGamepad is Gamepad => !!newGamepad)
            .forEach(newGamepad => {
                let oldGamepadsFiltered = this.gamepads.filter(oldGamepad => !!oldGamepad);
                if (!oldGamepadsFiltered.length) {
                    this.gamepads.push(newGamepad);
                    return;
                }

                for (let i = 0; i < oldGamepadsFiltered.length; i++) {
                    if (newGamepad.id == oldGamepadsFiltered[i].id) {
                        this.detectChanges(newGamepad, oldGamepadsFiltered[i]);
                        this.gamepads[i] = newGamepad;
                    }
                }
            });
    }

    private detectChanges(newGamepad: Gamepad, oldGamepad: Gamepad) {
        for (let i = 0; i < 3; i++) {
            if (newGamepad.axes[i] != oldGamepad.axes[i])
                this.stickMove(newGamepad);
        }
        for (let i = 0; i < 17; i++) {
            if (newGamepad.buttons[i].value != oldGamepad.buttons[i].value) {
                if (newGamepad.buttons[i].value)
                   this.buttonDown(newGamepad);
                else
                    this.buttonUp(newGamepad);
            }
        }
    }
}