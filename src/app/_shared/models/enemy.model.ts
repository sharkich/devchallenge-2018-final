import {SpacesbodyModel} from './spacesbody.model';

export class EnemyModel extends SpacesbodyModel {

  constructor(data?: any) {
    super(data);
    this.width = 10;
    this.height = 10;
    this.speed = 2;
    this.color = 'red';
  }

}
