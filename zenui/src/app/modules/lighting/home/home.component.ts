import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private lights: Array<any> = [];
  public selectedLights: Array<any> = [
    {name: "asdasd", address: "123"},
    {name: "asdasd", address: "123"},
    {name: "asdasd", address: "123"}
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
