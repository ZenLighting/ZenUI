import { Component, Input, OnInit, ViewChild, ElementRef, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-grid-control',
  templateUrl: './grid-control.component.html',
  styleUrls: ['./grid-control.component.css']
})
export class GridControlComponent implements OnInit, AfterViewInit {
  @Input("GridString") gridString: BehaviorSubject<string> = new BehaviorSubject(null);
  @ViewChild("colorselector") colorPicker: ElementRef;
  @ViewChild("gridcanvas") canvas: ElementRef;

  private gridcanvas: HTMLCanvasElement;
  public color: string;
  private grid: Array<Array<[number, number, number]>>;
  private on: boolean = false;


  @Output("lightOnState") lightOnState: EventEmitter<boolean> = new EventEmitter(true);
  @Output("colorEvent") colorChangeEvent: EventEmitter<string> = new EventEmitter(true);
  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.gridcanvas = this.canvas.nativeElement;
    this.gridString.subscribe((gridRep) => {
      if(gridRep == null){
        return;
      }
      this.grid = this.gridToRGBArray(gridRep);
      this.drawGridOnCanvas();
    });
  }

  gridToRGBArray(gridString: string){
    if(gridString.endsWith("\n")){
      gridString = gridString.slice(0, -1)
    }
    let gridArray = new Array<Array<[number, number, number]>>()
    gridString.split("\n").forEach((row) => {
      let gridRow = new Array<[number, number, number]>();
      row.split(")").forEach(colString => {
        colString = colString.slice(1); //remove leading (
        let rgbStringArray = colString.split(",");
        let rgbArray: [number, number, number] = [parseInt(rgbStringArray[0]), parseInt(rgbStringArray[1]), parseInt(rgbStringArray[2])];
        gridRow.push(rgbArray);
      })
      gridArray.push(gridRow);
    })
    return gridArray;
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
        if(!isNaN(this.grid[i][u][0])){
          //console.log(this.grid[i][u]);
          let r = this.grid[i][u][0];
          let g = this.grid[i][u][1];
          let b = this.grid[i][u][2];
          if(r == 0 && g==0 && b==0 && flag==false){
            let newOn = false;
            if(newOn != this.on){
              this.on = newOn;
              this.lightOnState.emit(newOn);
            }
            this.on = false;
            console.log("off")
          } else if(flag==false){
            let newOn = true;
            if(newOn != this.on){
              this.on = newOn;
              this.lightOnState.emit(newOn);
            }
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

  openColorPicker(){
    this.colorPicker.nativeElement.value = this.color;
    this.colorPicker.nativeElement.click();
  }

  sendColor(){
    this.colorChangeEvent.next(this.color);
  }
}
