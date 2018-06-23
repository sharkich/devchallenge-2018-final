import {PositionModel} from './position.model';

export class SpaceshipModel {
  public position: PositionModel;
  public velocity: PositionModel;
  public speed = 3;
  public speedBack = 1;

  public color = 'white';

  public width = 8;
  public height = 22;

  public angle = Math.PI / 2;
  public isEngineOn = false;
  public isGoBack = false;

  public isRotatingLeft = false;
  public isRotatingRight = false;

  public isCrashed = false;

  constructor(data?: any) {
    this.position = new PositionModel(data.position || {x: 0, y: 0});
  }

  public draw() {
    this.rotare();
    this.move();
  }

  public turn(isLeft = false, isStart = false) {
    if (isLeft) {
      this.isRotatingLeft = isStart;
    } else {
      this.isRotatingRight = isStart;
    }
  }

  public go(isBack = false) {
    this.isEngineOn = !isBack;
    this.isGoBack = isBack;
  }

  public stop() {
    this.isEngineOn = false;
    this.isGoBack = false;
  }

  private rotare() {
    if (this.isRotatingRight) {
      this.angle += Math.PI / 180;

    } else if (this.isRotatingLeft) {
      this.angle -= Math.PI / 180;
    }
  }

  private move() {
    if (this.isEngineOn) {
      this.position.x += Math.sin(this.angle) * this.speed;
      this.position.y -= Math.cos(this.angle) * this.speed;
    } else if (this.isGoBack) {
      this.position.x -= Math.sin(this.angle) * this.speedBack;
      this.position.y += Math.cos(this.angle) * this.speedBack;
    }
  }
}
