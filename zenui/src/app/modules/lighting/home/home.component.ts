import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private lights: Array<any> = [];
  public selectedLights: Array<any> = [
    {name: "asdasd", address: "123", grid: [
      [{index: 1, r: 255, g: 0, b:0}, 0, 0],
      [0, {index: 1, r: 255, g: 0, b:0}, 0],
      [0, 0, {index: 1, r: 255, g: 0, b:0}]
    ]},
    {name: "asdasd", address: "123", grid: [[{index: 1, r: 255, g: 255, b:255}]]},
    {name: "asdasd", address: "123", grid: [[{index: 1, r: 255, g: 255, b:255}]]}
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
