import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import {SpaceshipModel} from '../_shared/models/spaceship.model';
import {KeysService} from '../_shared/services/keys.service';
import {SpacesbodyModel} from '../_shared/models/spacesbody.model';
import {EnemyModel} from '../_shared/models/enemy.model';

const CANVAS_WIDTH = 900;
const CANVAS_HEIGHT = 400;

const SPACESBODIES = 300;
const ENEMIES = 10;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('canvas') canvasEl: ElementRef;
  public context: CanvasRenderingContext2D;

  public canvas: HTMLCanvasElement;

  public score = 0;

  public spaceship: SpaceshipModel;

  public spacesbodies: SpacesbodyModel[] = [];

  public enemies: EnemyModel[] = [];

  constructor(
    private keyService: KeysService,
    private cd: ChangeDetectorRef) {
  }

  ngOnInit() {
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
    this.canvas.width = CANVAS_WIDTH;
    this.canvas.height = CANVAS_HEIGHT;

    this.context = this.canvas.getContext('2d');

    this.start();
  }

  ngOnDestroy() {
  }

  public start() {
    this.score = 0;
    this.spaceship = new SpaceshipModel({position: {x: 40, y: 200}});
    this.initSpacesbodies();
    this.initEnemies();

    this.draw();

    this.cd.detectChanges();
  }

  private draw() {
    this.checkHits();
    if (this.spaceship.isCrashed) {
      return;
    }

    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // spaceship
    this.spaceship.draw();
    this.drawSpaceship();

    // spacesbodies
    this.spacesbodies.forEach((spacesbody) => {
      if (spacesbody.isCrashed) {
        return;
      }
      spacesbody.draw();
      this.drawSpacebody(spacesbody);
    });

    // enemies
    this.enemies.forEach((enemy) => {
      if (enemy.isCrashed) {
        return;
      }
      enemy.draw();
      this.drawSpacebody(enemy);
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

  private checkHits() {
    // enemies
    this.enemies.forEach((enemy) => {
      if (this.spaceship.isHitWith(enemy)) {
        this.spaceship.die();
      }
    });

    // spacesbodies
    this.spacesbodies = this.spacesbodies.filter((spacesbody) => {
      if (this.spaceship.isHitWith(spacesbody)) {
        this.score++;
        spacesbody.die();
        return false;
      }
      return true;
    });
    this.cd.detectChanges();
  }

  private initSpacesbodies() {
    this.spacesbodies = [];
    for (let i = 0; i <= SPACESBODIES; i++) {
      const rotate = Math.random() < 0.5;
      this.spacesbodies.push(new SpacesbodyModel({
        position: {
          x: Math.round(Math.random() * CANVAS_WIDTH),
          y: Math.round(Math.random() * CANVAS_HEIGHT)
        },
        speed: Math.round(Math.random() * 10),
        angle: Math.PI * Math.random(),
        color: 'green',
        isMove: Math.random() > 0.1,
        isRotatingLeft: rotate,
        isRotatingRight: !rotate
      }));
    }
  }

  private initEnemies() {
    this.enemies = [];
    for (let i = 0; i <= ENEMIES; i++) {
      const rotate = Math.random() < 0.5;
      this.enemies.push(new EnemyModel({
        position: {
          x: Math.round(Math.random() * CANVAS_WIDTH),
          y: Math.round(Math.random() * CANVAS_HEIGHT)
        },
        speed: Math.round(Math.random() * 10),
        angle: Math.PI * Math.random(),
        isMove: Math.random() > 0.1,
        isRotatingLeft: rotate,
        isRotatingRight: !rotate
      }));
    }
  }

}
