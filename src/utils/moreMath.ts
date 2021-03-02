/**
 * Class that provides more math functions
 */
export class MoreMath {
    /**
     * Interpolates the number (do not forget to reset the original value)
     * @param start Original value
     * @param end Target value
     * @param mu Interpolation factor (0 - slow, 1 - instant)
     */
    public static interpolateNumber(start: number, end: number, mu: number) : number {
        return (1 - mu) * start + mu * end;
    }
    
    /**
     * Interpolates the angle (do not forget to reset the original value)
     * @param start Original value
     * @param end Target value
     * @param mu Interpolation factor (0 - slow, 1 - instant)
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
}