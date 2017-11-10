package modeling.engine.engine;

import modeling.engine.engine.item.Magnet;
import modeling.engine.engine.utils.Coord;
import modeling.engine.engine.item.Sphere;
import modeling.engine.engine.utils.Converter;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

public class Engine {
    private Sphere sphere;
    private Magnet[] magnets;

    public Engine(Sphere sphere, Magnet... magnets) {
        this.sphere = sphere;
        this.magnets = magnets;
    }

    public List<Coord> compute(int range) {
        List<Coord> result = new ArrayList<>();
        try {
            for (int i = 0; i < range; i++) {
                handle();
                result.add((Coord) getCoord().clone());
            }
        } catch (CloneNotSupportedException e) {
            e.printStackTrace();
        }

        return result;
    }

    public void run() {
        Executors.newSingleThreadScheduledExecutor().scheduleAtFixedRate(this::handle, 0, 1, TimeUnit.SECONDS);
    }

    private void handle() {
        Coord delta = Converter.toCartesian(sphere.getSpeed(), sphere.getDirect());
        for(Magnet magnet : magnets) delta.merge(getMagnetVector(magnet));

        sphere.getCoord().merge(delta);
        sphere.setSpeed(Converter.getPolarValue(delta));
        sphere.setDirect(Converter.getPolarAngle(delta));
    }

    private Coord getMagnetVector(Magnet magnet) {
        double x = magnet.getCoord().getX() - sphere.getCoord().getX();
        double y = magnet.getCoord().getY() - sphere.getCoord().getY();
        double angle = Converter.getPolarAngle(new Coord(x, y));
        double distance = Converter.getPolarValue(new Coord(x, y));
        Coord result = Converter.toCartesian(magnet.getPower() / Math.pow(distance, 2), angle);
        return result;
    }

    public Coord getCoord() {
        return sphere.getCoord();
    }

    public Magnet[] getMagnets() {
        return magnets;
    }
}
