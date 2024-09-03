import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css']
})
export class MatchesComponent implements OnInit {
  matchesTab:any=[
    {id:1,scoreone:1,scoretow:4,team1:"FCB",team2:"RMD" },
    {id:2,scoreone:4,scoretow:0,team1:"EST",team2:"CA" },
    {id:3,scoreone:2,scoretow:2,team1:"LIV",team2:"ARS" },
    {id:4,scoreone:1,scoretow:4,team1:"ML",team2:"MUN" },
    {id:5,scoreone:3,scoretow:2,team1:"MS",team2:"ASV" }
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
