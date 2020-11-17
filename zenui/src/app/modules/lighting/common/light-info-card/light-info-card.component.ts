import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-light-info-card',
  templateUrl: './light-info-card.component.html',
  styleUrls: ['./light-info-card.component.css']
})
export class LightInfoCardComponent implements AfterViewInit {
  @Input("name") name;
  @Input("address") address;
  @Input("grid") grid: Array<Array<{
    index: number,
    r: number,
    g: number,
    b: number
  } | 0>>;

  @ViewChild("gridcanvas") canvas: ElementRef;
  private gridcanvas: HTMLCanvasElement;

  constructor() { }

  ngAfterViewInit(): void {
    this.gridcanvas = this.canvas.nativeElement;
    this.drawGridOnCanvas();
  }

  drawGridOnCanvas(){
    let ctx = this.gridcanvas.getContext("2d");

    let canvasHeight = this.gridcanvas.height;
    let canvasWidth = this.gridcanvas.width;

    let gridHeight = this.grid.length;
    let gridWidth = this.grid[0].length;

    let scalingFactorY = canvasHeight/gridHeight;
    let scalingFactorX = canvasWidth/gridWidth;
    console.log(scalingFactorY, scalingFactorX);
    for(let i=0; i<gridHeight; i++){
      for(let u=0; u<gridWidth; u++){
        ctx.beginPath();
        ctx.rect(i*scalingFactorX, u*scalingFactorY, scalingFactorX, scalingFactorY);
        if(this.grid[i][u] != 0){
          let r = (this.grid[i][u] as any).r;
          let g = (this.grid[i][u] as any).g;
          let b = (this.grid[i][u] as any).b;
          ctx.fillStyle = `rgb(${r}, ${g}, ${b})`
        } else{
          ctx.fillStyle = 'white';
        }
        ctx.fill();
      }
    }
  }

}
