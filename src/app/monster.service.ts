import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of} from 'rxjs';
import { Monster } from './monster';

@Injectable({
  providedIn: 'root'
})
export class MonsterService {

  constructor(private http: HttpClient) { 
    this.http.head
  }

  private monsterApiUrl = 'http://localhost:5000/monster';

  getMonster(id: number): Observable<Monster>{
    const url = `${this.monsterApiUrl}/${id}`;
    return this.http.get<Monster>(url);
  }

  getMonsters(): Observable<Monster[]>{
    const url = 'http://localhost:5000/monsters/all';
    return this.http.get<Monster[]>(url);
  }
}
