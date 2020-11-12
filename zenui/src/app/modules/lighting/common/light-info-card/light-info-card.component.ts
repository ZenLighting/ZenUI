import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-light-info-card',
  templateUrl: './light-info-card.component.html',
  styleUrls: ['./light-info-card.component.css']
})
export class LightInfoCardComponent implements OnInit {
  @Input("name") name;
  @Input("address") address;
  @Input("grid") grid: Array<Array<{
    index: number,
    r: number,
    g: number,
    b: number
  }>>;

  @ViewChild("gridcanvas") canvas: ElementRef;
  private gridcanvas: HTMLCanvasElement;

  constructor() { }

  ngOnInit(): void {
    this.gridcanvas = this.canvas.nativeElement;
  }

  drawGridOnCanvas(){
    let canvasHeight = this.gridcanvas.height;
    let canvasWidth = this.gridcanvas.width;

    let gridHeight = this.grid.length;
    let gridWidth = this.grid[0].length;


  }

}
