package modeling.engine.engine.utils;

public class Converter {
    public static Coord toCartesian(double radius, double angle) {
        double temp = Math.toRadians(angle);
        double x = round(radius * Math.cos(temp));
        double y = round(radius * Math.sin(temp));
        return new Coord(x, y);
    }

    private static double round(double value) {
        return Math.round(value * 10000) / 10000.0;
    }

    public static double getPolarValue(Coord coord) {
        return round(Math.sqrt(Math.pow(coord.getX(), 2) + Math.pow(coord.getY(), 2)));
    }

    public static double getPolarAngle(Coord coord) {
        double value = Math.toDegrees(Math.atan(coord.getY()/coord.getX()));
        if (coord.getX() >= 0) {
            if (coord.getY() >= 0) return round(value);
            else return round(value) + 360;
        } else return round(value) + 180;
    }
}
