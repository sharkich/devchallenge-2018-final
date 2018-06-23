import {PositionModel, IPositionModel} from './position.model';

export interface ISpaceshipModel {
  position?: IPositionModel;
  velocity?: IPositionModel;
}

export class SpaceshipModel {
  public position: PositionModel;
  public velocity: PositionModel;

  public color = 'white';

  public width = 8;
  public height = 22;

  public angle = Math.PI / 2;
  public isEngineOn = false;

  public isRotatingLeft = false;
  public isRotatingRight = false;

  public isCrashed = false;

  constructor(data?: ISpaceshipModel) {
    this.position = new PositionModel(data.position || {x: 0, y: 0});
  }
}
