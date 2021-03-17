import { Vector2 } from "three";

/**
 * Class that provides more math functions
 */
export class MoreMath {
    /**
     * Interpolates the number (do not forget to reset the original value)
     * @param start Original value
     * @param end Target value
     * @param mu Interpolation factor (0 - slow, 1 - instant)
     * @returns Interpolated number
     */
    public static interpolateNumber(start: number, end: number, mu: number) : number {
        return (1 - mu) * start + mu * end;
    }
    
    /**
     * Interpolates the angle (do not forget to reset the original value)
     * @param start Original value
     * @param end Target value
     * @param mu Interpolation factor (0 - slow, 1 - instant)
     * @returns Interpolated angle
     */
    public static interpolateAngle(start: number, end: number, mu: number) : number {

        if (Math.abs(end - start) > Math.PI) {
            if (end > start)
                start += Math.PI * 2;
            else
                start -= Math.PI * 2;
        }

        let interpolated = (start + ((end - start) * mu));

        return interpolated;
    }

    /**
     * Takes an axis input remaps it to have a deadzone with clamping
     * @param input 2D Vector of an axis input
     * @param deadzone The cut out value. The inputs lower than this value will be ignored (default = 0.25)
     */
    public static clampInputVector(input: Vector2, deadzone: number = 0.25) {
        if (input.x && input.y) {
            // Find the length of the current input
            let length: number = input.length();
            // Calculate percentage of the maximum input length
            length = Math.min(Math.max((length - deadzone) / (1 - deadzone), 0), 1)
            // Set it
            input.setLength(length);
        }
    }
}