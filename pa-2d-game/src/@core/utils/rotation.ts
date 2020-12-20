export function calcAngle(x0: number, y0: number, x1: number, y1: number) {
    const diffX = x1 - x0;
    const diffY = y1 - y0;
    let result = Math.atan2(diffY, diffX);
    if (result < 0) result += 2 * Math.PI;
    return result;
}
