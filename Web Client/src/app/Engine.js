import React from 'react';

import Coordinate from "./base/Coordinate";
import Sphere from "./base/Sphere";
import Magnet from "./base/Magnet";

const width = 1800;
const height = 930;
const radius = 10;
const modifier = 10;

const styles = {
};

export default class Engine extends React.Component {
  state = {
    ctx: null,
    data: []
  };

  temp = {
    sphere: new Sphere(new Coordinate(0, 0), 13, 0),
    magnets: [
      // new Magnet(new Coordinate(20, 200), 20000),
      // new Magnet(new Coordinate(220, 300), 30000),
      new Magnet(new Coordinate(400, 100), 50000),
      new Magnet(new Coordinate(800, -250), 90),
      // new Magnet(new Coordinate(100, -140), 4000)
    ]
  };

  componentDidMount() {
    fetch('http://localhost:8080/', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify(this.temp)
    })
      .then(res => {
        return res.json()
      })
      .then(json => {
        console.log('Data have been gotten');
        this.setState({
          data: json
        });

        this.initField();
        this.initMagnets();

        this.tick();
      });
  }

  initField = () => {
    this.state.ctx = this.refs.canvas.getContext('2d');

    this.state.ctx.translate(width/2, height/2);
    this.state.ctx.save();

    this.state.ctx.arc(0, 0, radius, 0, 7, false);
    this.state.ctx.stroke();
  };

  initMagnets = () => {
    this.temp.magnets.forEach(magnet => this.drawMagnet(magnet.coord));
  };

  drawMagnet = (coord) => {
    this.state.ctx.fillRect(coord.x, coord.y, radius * 1.5, radius * 1.5);
  };

  tick = () => {
    setTimeout(() => {
      this.state.ctx.clearRect(-width/2, -height/2, width, height);
      this.move(this.state.data.shift());

      if (this.state.data.length !== 0) this.tick();
    }, 100);
  };

  move(coord) {
    // this.state.ctx.clearRect(-width/2, -height/2, width, height);
    // this.state.ctx.translate(, coord.y/modifier);
    this.state.ctx.beginPath();
    this.initMagnets();
    this.state.ctx.arc(coord.x, coord.y, radius, 0, 7, false);
    this.state.ctx.stroke();
  }

  render() {
    return (
      <canvas id="canvas" ref="canvas" width={width} height={height} />
    );
  }
}