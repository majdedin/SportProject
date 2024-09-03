import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
m: any={id:3,scoreone:2,scoretow:2,team1:"LIV",team2:"ARS"}
  constructor() { }

  ngOnInit(): void {
  }

}
