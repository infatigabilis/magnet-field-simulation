export default class Sphere {
  constructor(coord, speed, direct) {
    this.coord = coord;
    this.speed = speed;
    this.direct = Math.abs(360 - direct);
  }
}