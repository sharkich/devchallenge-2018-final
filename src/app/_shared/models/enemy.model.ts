import {SpacesbodyModel} from './spacesbody.model';

export class EnemyModel extends SpacesbodyModel {

  constructor(data?: any) {
    super(data);
    this.radius = 10;
    this.speed = 2;
    this.color = 'red';
  }

}
