import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Game } from '../interfaces/Game';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private endpoint:string = environment.endPoint;
  private apiUrl:string = this.endpoint + "/Game/";

  constructor(private http:HttpClient) { }

  getGames():Observable<Game[]>{
    return this.http.get<Game[]>(`${this.apiUrl}Getgames`);
  }

  getXbox():Observable<Game[]>{
    return this.http.get<Game[]>(`${this.apiUrl}GetGamesXbox`);
  }

  getPS():Observable<Game[]>{
    return this.http.get<Game[]>(`${this.apiUrl}GetGamesPS`);
  }

  getPC():Observable<Game[]>{
    return this.http.get<Game[]>(`${this.apiUrl}GetGamesPC`);
  }

  getNintendo():Observable<Game[]>{
    return this.http.get<Game[]>(`${this.apiUrl}GetGamesNintendo`);
  }

  getRandomGames():Observable<Game[]>{
    return this.http.get<Game[]>(`${this.apiUrl}GetRandomGames`);
  }

  addGame(request:Game):Observable<Game>{
    return this.http.post<Game>(`${this.apiUrl}AddGame`,request);
  }

  getGamesByName(namegame: string): Observable<Game[]> {
    return this.http.get<Game[]>(`${this.apiUrl}GetGameByName?namegame=${namegame}`);
  }

}
