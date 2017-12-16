import React from 'react';

import Mediator from './util/Mediator'

const width = 1540;
const height = 900;
const radius = 10;
const modifier = 10;

const styles = {
};

export default class Engine extends React.Component {
  state = {
    ctx: null,
    data: [],
    magnets: []
  };

  componentDidMount() {
    Mediator.set({
      receiveData: this.receiveData
    });
    this.initField();
  }

  receiveData = (temp) => {
    fetch('http://localhost:8080/', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify(temp)
    })
      .then(res => {
        return res.json()
      })
      .then(json => {
        console.log(json);
        this.setState({
          data: json,
          sphere: temp.sphere,
          magnets: temp.magnets
        });

        this.initSphere();
        this.initMagnets();
        this.tick();
      });
  };

  initField = () => {
    this.state.ctx = this.refs.canvas.getContext('2d');

    this.state.ctx.translate(width/2, height/2);
    this.state.ctx.save();
  };

  initSphere = () => {
    this.state.ctx.arc(this.state.sphere.coord.x, this.state.sphere.coord.y, radius, 0, 7, false);
    this.state.ctx.stroke();
  };

  initMagnets = () => {
    this.state.magnets.forEach(magnet => this.drawMagnet(magnet.coord));
  };

  drawMagnet = (coord) => {
    this.state.ctx.fillRect(coord.x, coord.y, radius * 1.5, radius * 1.5);
  };

  tick = () => {
    setTimeout(() => {
      this.state.ctx.clearRect(-width/2, -height/2, width, height);
      this.move(this.state.data.shift());

      if (this.state.data.length !== 0) this.tick();
    }, 20);
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