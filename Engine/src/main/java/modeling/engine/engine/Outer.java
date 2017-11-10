package modeling.engine.engine;

import modeling.engine.engine.item.Magnet;
import modeling.engine.engine.utils.Coord;

import java.util.concurrent.*;

public class Outer {
    private Engine engine;
    private BlockingQueue<int[][]> states = new LinkedBlockingQueue<>();

    private static final int MODIFIER = 5;
    private static final int MAP_SIZE = 30;

    public Outer(Engine engine) {
        this.engine = engine;
    }

    public void run() {
        Executors.newSingleThreadScheduledExecutor().scheduleAtFixedRate(this::handle, 0, 1, TimeUnit.SECONDS);
        Executors.newSingleThreadExecutor().submit(this::printToConsole);
    }

    private void printToConsole() {
        while (true) {
            int[][] map = new int[0][];
            try {
                map = states.take();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }

            for (int i = 0; i < MAP_SIZE; i++) {
                for (int j = 0; j < MAP_SIZE; j++)
                    System.out.print(toToken(map[i][j]) + " ");
                System.out.println();
            }
            System.out.println();
        }
    }

    private String toToken(int i) {
        switch (i) {
            case 0: return "-";
            case 1: return "#";
            case 2: return "0";
        }
        throw new RuntimeException();
    }

    private void handle() {
        Coord coord = engine.getCoord();

        int x = (int) Math.round(coord.getX() / MODIFIER);
        int y = (int) Math.round(coord.getY() / MODIFIER);

        int[][] map = new int[MAP_SIZE][MAP_SIZE];
        map[MAP_SIZE/2 - y][MAP_SIZE/2 + x] = 1;

        for (Magnet magnet: engine.getMagnets()) {
            x = (int) Math.round(magnet.getCoord().getX() / MODIFIER);
            y = (int) Math.round(magnet.getCoord().getY() / MODIFIER);
            map[MAP_SIZE/2 - y][MAP_SIZE/2 + x] = 2;
        }

        states.add(map);
    }
}
