import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('spaceCanvas') spaceCanvas: ElementRef;
  public context: CanvasRenderingContext2D;


  constructor() {
  }

  ngOnInit() {
    console.log('init');
  }

  ngAfterViewInit(): void {
    this.context = (<HTMLCanvasElement>this.spaceCanvas.nativeElement).getContext('2d');
    console.log('context', this.context);
  }

  ngOnDestroy() {
  }

}
