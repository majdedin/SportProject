import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.css']
})
export class AddPlayerComponent implements OnInit {
player:any={};
playerForm! :FormGroup;
  constructor(private pService:PlayerService,private router:Router) { }

  ngOnInit(): void {
  }
  addPlayer(){
    console.log('Add player ', this.player);
    this.pService.addPlayer(this.player).subscribe(
     (response)=>{
      console.log("here response after adding player",response);
       this.router.navigate(['/admin']);
     }
    );
  
  }
  
}
