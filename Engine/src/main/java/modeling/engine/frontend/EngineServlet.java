package modeling.engine.frontend;

import com.google.gson.Gson;
import modeling.engine.engine.Engine;
import modeling.engine.engine.item.Magnet;
import modeling.engine.engine.item.Sphere;
import modeling.engine.engine.item.Coord;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

public class EngineServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String input = req.getReader().readLine();
        Payload payload = new Gson().fromJson(input, Payload.class);
        payload.sphere.setCoord(new Coord(0, 0));

        Engine engine = new Engine(payload.sphere, payload.magnets);
        List<Coord> result = engine.compute(10000);
        String output = new Gson().toJson(result);

//        log(result);

        resp.getWriter().write(output);
    }

    private void log(List<Coord> result) {
        for (Coord c : result) System.out.println(c);
    }

    private class Payload {
        private Sphere sphere;
        private Magnet[] magnets;
    }
}
