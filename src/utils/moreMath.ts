export class MoreMath {
    public static interpolateNumber(start: number, end: number, mu: number) : number {
        return (1 - mu) * start + mu * end;
    }
    
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