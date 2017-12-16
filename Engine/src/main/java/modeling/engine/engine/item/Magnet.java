package modeling.engine.engine.item;

public class Magnet {
    private Coord coord;
    private double power;

    public Magnet(Coord coord, int power) {
        this.coord = coord;
        this.power = power;
    }

    public Coord getCoord() {
        return coord;
    }

    public void setCoord(Coord coord) {
        this.coord = coord;
    }

    public double getPower() {
        return power;
    }

    public void setPower(double power) {
        this.power = power;
    }
}
