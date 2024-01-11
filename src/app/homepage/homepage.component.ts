import { Component, OnInit } from '@angular/core';
import { Game } from '../interfaces/Game';
import { GameService } from '../services/game.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule,  FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule, ReactiveFormsModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent implements OnInit{

  listGames:Game[] = []
  formgame:FormGroup
  game1:Game | undefined
  game2:Game | undefined
  game3:Game | undefined

  constructor(
    private gameservice:GameService,
    private fb:FormBuilder
  ){
    this.formgame=this.fb.group({
      namegame:['', Validators.required]
    })
  }

  obtaingames(){
    this.gameservice.getGames().subscribe({
      next:(data) =>{
        this.listGames = data;
      }
    })
  } 

  obtainrandomgames(){
    this.gameservice.getRandomGames().subscribe({
      next:(data) =>{
        this.game1 = data[0]
        this.game2 = data[1]
        this.game3 = data[2]
      }
    })
  }

  ngOnInit(): void {
      this.obtaingames()
      this.obtainrandomgames()
  }

  searchGame(){
    const gamesearched = this.formgame.value.namegame
    this.gameservice.getGamesByName(gamesearched).subscribe({
      next:(data) =>{
        this.listGames = data;
      }
    })
  }

  obtainxboxgames(){
    this.gameservice.getXbox().subscribe({
      next:(data) =>{
        this.listGames = data;
        console.log(this.listGames)
      }
    })
  }

  obtainpsgames(){
    this.gameservice.getPS().subscribe({
      next:(data) =>{
        this.listGames = data;
      }
    })
  }

  obtainnintendogames(){
    this.gameservice.getNintendo().subscribe({
      next:(data) =>{
        this.listGames = data;
      }
    })
  }

  getPlatformLogoUrl(platform: string): string {
    switch (platform.toLowerCase()) {
      case 'ps':
        return 'assets/images/pscolor.png';
      case 'pc':
        return 'assets/images/windowsimg.png';
      case 'xbox':
        return 'assets/images/xboxcolor.png';
      case 'nintendo':
        return 'assets/images/nintendocolor.png';
      default:
        return 'empty';
    }
  }


  getRating(rating:string): string {
    switch (rating) {
      case 'E10':
        return 'assets/images/e10rating.png';
      case 'T':
        return 'assets/images/trating.png';
      case 'M':
        return 'assets/images/mrating.png';
      case 'A':
        return 'assets/images/arating.png';
      default:
        return 'assets/images/erating.png';
    }
  }
}
