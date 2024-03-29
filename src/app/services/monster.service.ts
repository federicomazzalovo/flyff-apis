import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of} from 'rxjs';
import { Monster } from '../models/monster';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MonsterService {

  constructor(private http: HttpClient) { 
    this.http.head
  }

  getMonster(id: number): Observable<Monster>{
    const url = environment.apiEndpoint + 'monsters/' + id;
    return this.http.get<Monster>(url);
  }

  getMonsters(): Observable<Monster[]>{
    const url = environment.apiEndpoint + 'monsters/all';
    return this.http.get<Monster[]>(url);
  }
}
