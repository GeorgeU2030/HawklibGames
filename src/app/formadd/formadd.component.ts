import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GameService } from '../services/game.service';
import { Game } from '../interfaces/Game';
import { Router } from '@angular/router';

@Component({
  selector: 'app-formadd',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './formadd.component.html',
  styleUrl: './formadd.component.css'
})
export class FormaddComponent {

  formgame:FormGroup;
  constructor(
    private gameservice:GameService,
    private fb:FormBuilder,
    private router:Router
  ){
    this.formgame = this.fb.group({
      nameOfGame: ['', Validators.required],
      yearOfGame: ['2024', Validators.required],
      coverGame: ['', Validators.required],
      storageGame: ['50', Validators.required],
      studioGame: ['', Validators.required],
      priceGame: ['', Validators.required],
      platformGame: [''],
      rating: ['', Validators.required]
    })
  }

  platforms: string[] = ['Xbox', 'PS', 'Nintendo', 'PC'];


  updatePlatforms(event: any) {
    const platformValue = event.target.value;
  
    let currentPlatforms = this.formgame.get('platformGame')?.value || '';
    const platformArray = currentPlatforms.split(',').filter(Boolean); 
  
    if (event.target.checked && platformArray.indexOf(platformValue) === -1) {
      platformArray.push(platformValue);
    } else if (!event.target.checked) {
      const index = platformArray.indexOf(platformValue);
      if (index !== -1) {
        platformArray.splice(index, 1);
      }
    }
    this.formgame.get('platformGame')?.setValue(platformArray.join(','));
  }

  setRating(rating: string) {
    this.formgame.get('rating')?.setValue(rating);
  }

  addGame(){
    const newgame:Game={
      idgame:0,
      namegame:this.formgame.value.nameOfGame,
      cover:this.formgame.value.coverGame,
      platformgame:this.formgame.value.platformGame,
      storage:this.formgame.value.storageGame,
      yeargame:this.formgame.value.yearOfGame,
      studio:this.formgame.value.studioGame,
      price:this.formgame.value.priceGame,
      rating:this.formgame.value.rating
    };

    this.gameservice.addGame(newgame).subscribe(
      (data)=>{
        console.log('Juego agregado exitosamente', data);
        this.router.navigate(['/home']);
      },
      (error) => {
        console.error('Error al agregar el juego', error); 
      }
    )

  }
  
  
}