package modeling.engine.engine.item;

import modeling.engine.engine.utils.Coord;

public class Sphere {
    private Coord coord = new Coord(0, 0);
    private double speed;
    private double direct;

    public Sphere(int speed, int direct) {
        this.speed = speed;
        this.direct = direct;
    }

    public double getSpeed() {
        return speed;
    }

    public void setSpeed(double speed) {
        this.speed = speed;
    }

    public double getDirect() {
        return direct;
    }

    public void setDirect(double direct) {
        this.direct = direct;
    }

    public Coord getCoord() {
        return coord;
    }

    public void setCoord(Coord coord) {
        this.coord = coord;
    }
}
