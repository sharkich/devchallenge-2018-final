import {EventEmitter, Injectable} from '@angular/core';

export const KEY = {
  left: 37,
  right: 39,
  up: 38,
  down: 40
};

@Injectable()
export class KeysService {

  public $onPressUp: EventEmitter<any> = new EventEmitter();
  public $onPressDown: EventEmitter<any> = new EventEmitter();
  public $onPressLeft: EventEmitter<any> = new EventEmitter();
  public $onPressRight: EventEmitter<any> = new EventEmitter();

  public $onLetGoUp: EventEmitter<any> = new EventEmitter();
  public $onLetGoDown: EventEmitter<any> = new EventEmitter();
  public $onLetGoLeft: EventEmitter<any> = new EventEmitter();
  public $onLetGoRight: EventEmitter<any> = new EventEmitter();

  constructor() {
    document.addEventListener('keydown', this.keyPressed.bind(this));
    document.addEventListener('keyup', this.keyLetGo.bind(this));
  }

  private isOurKey(event): boolean {
    return [37, 38, 39, 40].indexOf(event.keyCode) !== -1;
  }

  private keyPressed(event: any) {
    if (!this.isOurKey(event)) {
      return;
    }
    event.preventDefault();
    switch (event.keyCode) {
      case 37: // Left Arrow key
        this.$onPressLeft.emit();
        break;
      case 39: // Right Arrow key
        this.$onPressRight.emit();
        break;
      case 38: // Up Arrow key
        this.$onPressUp.emit();
        break;
      case 40: // Down Arrow key
        this.$onPressDown.emit();
        break;
    }
  }

  private keyLetGo(event: any) {
    if (!this.isOurKey(event)) {
      return;
    }
    event.preventDefault();
    switch (event.keyCode) {
      case 37: // Left Arrow key
        this.$onLetGoLeft.emit();
        break;
      case 39: // Right Arrow key
        this.$onLetGoRight.emit();
        break;
      case 38: // Up Arrow key
        this.$onLetGoUp.emit();
        break;
      case 40: // Down Arrow key
        this.$onLetGoDown.emit();
        break;
    }
  }

}
