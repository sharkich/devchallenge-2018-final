import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {SpaceshipModel} from '../_shared/models/spaceship.model';
import {KeysService} from '../_shared/services/keys.service';
import {SpacesbodyModel} from '../_shared/models/spacesbody.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('canvas') canvasEl: ElementRef;
  public context: CanvasRenderingContext2D;

  public canvas: HTMLCanvasElement;

  public spaceship = new SpaceshipModel({
    position: {x: 40, y: 200}
  });

  public spacesbodies: SpacesbodyModel[] = [];

  constructor(private keyService: KeysService) {
  }

  ngOnInit() {
    const body = new SpacesbodyModel({
      position: {x: 400, y: 100},
      speed: 1,
      angle: Math.PI,
      color: 'green',
      isMove: true,
      isRotatingRight: true
    });
    this.spacesbodies.push(body);

    this.keyService.$onPressDown.subscribe(this.engineGoBack.bind(this));
    this.keyService.$onPressUp.subscribe(this.engineOn.bind(this));
    this.keyService.$onPressLeft.subscribe(() => this.turnLeft(true));
    this.keyService.$onPressRight.subscribe(() => this.turnRight(true));

    this.keyService.$onLetGoDown.subscribe(this.engineOff.bind(this));
    this.keyService.$onLetGoUp.subscribe(this.engineOff.bind(this));
    this.keyService.$onLetGoLeft.subscribe(() => this.turnLeft());
    this.keyService.$onLetGoRight.subscribe(() => this.turnRight());
  }

  ngAfterViewInit(): void {
    this.canvas = <HTMLCanvasElement>this.canvasEl.nativeElement;
    this.canvas.width = 900;
    this.canvas.height = 400;

    this.context = this.canvas.getContext('2d');
    this.draw();
  }

  ngOnDestroy() {
  }

  private draw() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.spaceship.draw();
    this.drawSpaceship();

    this.spacesbodies.forEach((spacesbody) => {
      spacesbody.draw();
      this.drawSpacebody(spacesbody);
    });

    requestAnimationFrame(this.draw.bind(this));
  }

  private drawSpaceship() {
    this.context.save();
    this.drawSpacebody(this.spaceship, true);
    this.drawFlame();
    this.context.restore();
  }

  private drawSpacebody(spacebody: SpacesbodyModel, isSkipContex = false) {
    if (!isSkipContex) {
      this.context.save();
    }
    this.context.beginPath();
    this.context.translate(spacebody.position.x, spacebody.position.y);
    this.context.rotate(spacebody.angle);
    this.context.rect(spacebody.width * -0.5, spacebody.height * -0.5, spacebody.width, spacebody.height);
    this.context.fillStyle = spacebody.color;
    this.context.fill();
    this.context.closePath();
    if (!isSkipContex) {
      this.context.restore();
    }
  }

  private turnLeft(isStart = false) {
    this.spaceship.turn(true, isStart);
  }

  private turnRight(isStart = false) {
    this.spaceship.turn(false, isStart);
  }

  private engineOn() {
    this.spaceship.go();
  }

  private engineGoBack() {
    this.spaceship.go(true);
  }

  private engineOff() {
    this.spaceship.stop();
  }

  private drawFlame() {
    // Draw the flame if engine is on
    if (this.spaceship.isMove) {
      this.context.beginPath();
      this.context.moveTo(this.spaceship.width * -0.5, this.spaceship.height * 0.5);
      this.context.lineTo(this.spaceship.width * 0.5, this.spaceship.height * 0.5);
      this.context.lineTo(0, this.spaceship.height * 0.5 + Math.random() * 10);
      this.context.lineTo(this.spaceship.width * -0.5, this.spaceship.height * 0.5);
      this.context.closePath();
      this.context.fillStyle = 'orange';
      this.context.fill();
    }
  }

}
