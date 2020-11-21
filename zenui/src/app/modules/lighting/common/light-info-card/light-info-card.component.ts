import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { interval } from 'rxjs';

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
  } | {}>>;

  public on: boolean = false;

  @ViewChild("gridcanvas") canvas: ElementRef;
  private gridcanvas: HTMLCanvasElement;

  constructor() { }

  ngAfterViewInit(): void {
    this.gridcanvas = this.canvas.nativeElement;
    this.drawGridOnCanvas();
    setInterval(() => this.drawGridOnCanvas(), 500);
  }

  drawGridOnCanvas(){
    let ctx = this.gridcanvas.getContext("2d");

    let canvasHeight = this.gridcanvas.height;
    let canvasWidth = this.gridcanvas.width;

    let gridHeight = this.grid.length;
    let gridWidth = this.grid[0].length;

    let scalingFactorY = canvasHeight/gridHeight;
    let scalingFactorX = canvasWidth/gridWidth;

    let flag = false;

    console.log(scalingFactorY, scalingFactorX);
    for(let i=0; i<gridHeight; i++){
      for(let u=0; u<gridWidth; u++){
        ctx.beginPath();
        ctx.rect(i*scalingFactorX, u*scalingFactorY, scalingFactorX, scalingFactorY);
        if(this.grid[i][u] != 0){
          //console.log(this.grid[i][u]);
          let r = (this.grid[i][u] as any).r;
          let g = (this.grid[i][u] as any).g;
          let b = (this.grid[i][u] as any).b;
          if(r == 0 && g==0 && b==0 && flag==false){
            this.on = false;
            console.log("off")
          } else if(flag==false){
            this.on = true;
            console.log("on")
          }
          flag = true;
          ctx.fillStyle = `rgb(${r}, ${g}, ${b})`
        } else{
          ctx.fillStyle = 'white';
        }
        ctx.fill();
      }
    }
  }

}
