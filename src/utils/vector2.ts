export class Vector2 {
    x: number;
    y: number;

    public constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public add(vector: Vector2) {
        return new Vector2(this.x + vector.x, this.y + vector.y);
    }

    public addInPlace(vector: Vector2) {
        this.x += vector.x;
        this.y += vector.y;
    }

    public scaleInPlace(s: number) {
        this.x *= s;
        this.y *= s;
    }

    public subtract(otherVector: Vector2) {
        return new Vector2(this.x - otherVector.x, this.y - otherVector.y);
    }

    public subtractInPlace(otherVector: Vector2) {
        this.x -= otherVector.x;
        this.y -= otherVector.y;
    }

    public rotateInPlaceBy(theta: number) {
        let nX = this.x * Math.cos(theta) - this.y * Math.sin(theta);
        let nY = this.x * Math.sin(theta) + this.y * Math.cos(theta);

        this.x = nX;
        this.y = nY;
    }

    public static DistanceSquared(vector1: Vector2, vector2: Vector2) {
        return (vector1.x - vector2.x)**2 + (vector1.y - vector2.y)**2;
    }

    public static Distance(vector1: Vector2, vector2: Vector2) {
        return Math.sqrt(Vector2.DistanceSquared(vector1, vector2));
    }

    public static Direction(point1: Vector2, point2: Vector2) {
        let direction = point2.subtract(point1);
        direction.normalizeInPlace();
        return direction;
    }

    public normalizeInPlace() {
        let mag = Math.sqrt(this.x**2 + this.y**2);
        if(mag == 0) return;
        this.x /= mag;
        this.y /= mag;
    }

    public clone() {
        return new Vector2(this.x, this.y);
    }
}