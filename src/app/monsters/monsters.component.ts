import { Component, OnInit, PipeTransform  } from '@angular/core';
import { Monster } from '../monster';
import { MonsterService } from '../monster.service';
import { DecimalPipe } from '@angular/common';
import { FormControl } from '@angular/forms';

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-monsters',
  templateUrl: './monsters.component.html',
  styleUrls: ['./monsters.component.css'],
  providers: [DecimalPipe]
})
export class MonstersComponent implements OnInit {

  filter = new FormControl('');
  monsters: Monster[] = [];
  tableDatasource$: Observable<Monster[]> = new Observable<Monster[]>();
  selectedMonster?: Monster;
  dataLoaded: boolean = false;

  constructor(private monsterService: MonsterService, private pipe: DecimalPipe) { 
  }

  ngOnInit(): void {
    this.getMonsters();
  }

  onSelect(monster: Monster): void {
    this.selectedMonster = monster;
  }

  onDeselectMonster(): void{
    this.selectedMonster = undefined;
  }

  getMonsters(): void{
    this.monsterService.getMonsters()
          .subscribe(monsters => { 
            this.monsters = monsters.sort((monster1, monster2) => monster1.level - monster2.level);
            this.initTableDatasource();
          });
  }

  private initTableDatasource(){
    this.tableDatasource$ = this.filter.valueChanges.pipe(
      startWith(''),
      map(text => this.search(text, this.pipe))
    );

    this.dataLoaded = true;
  }

  search(text: string, pipe: PipeTransform): Monster[] {
    return this.monsters.filter(monster => {
      const term = text.toLowerCase();

      return monster.name.en.toLowerCase().includes(term)
          || pipe.transform(monster.level).includes(term);
    });
  }
}
