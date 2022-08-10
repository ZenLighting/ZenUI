import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { interval } from 'rxjs';
import { Device } from 'src/app/core/models/devices';
import { RestapiService } from 'src/app/core/services/zenserver/restapi/restapi.service';

@Component({
  selector: 'app-light-info-card',
  templateUrl: './light-info-card.component.html',
  styleUrls: ['./light-info-card.component.css']
})
export class LightInfoCardComponent implements OnInit, AfterViewInit {
  @Input("device") device: Device;
  @ViewChild("colorselector") colorPicker: ElementRef;

  public on: boolean = false;
  public color: string;

  @ViewChild("gridcanvas") canvas: ElementRef;
  private gridcanvas: HTMLCanvasElement;
  private grid: Array<Array<[number, number, number]>>;

  constructor(
    private api: RestapiService
  ) { }

  ngOnInit(): void {
    console.log(this.device)
  }

  ngAfterViewInit(): void {
    this.gridcanvas = this.canvas.nativeElement;
    if(this.device.last_address != null){
      setInterval(() => {
        this.api.getDeviceInformation(this.device.id).then((response) => {
          this.grid = this.gridToRGBArray(response.grid);
          this.drawGridOnCanvas();

        });
      }, 1000)
    }
    //setInterval(() => this.drawGridOnCanvas(), 500);
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

  sendColor(){
    if(this.color != undefined){
      let r = parseInt(this.color[1] + this.color[2], 16);
      let g = parseInt(this.color[3]+this.color[4], 16);
      let b = parseInt(this.color[5]+this.color[6], 16);
      this.api.setDeviceColor(this.device.id.toString(), r, g, b);
    }
    console.log(this.color)
  }

  openColorPicker(){
    this.colorPicker.nativeElement.value = this.color;
    this.colorPicker.nativeElement.click();
  }

}
