import { Component, OnInit, PipeTransform  } from '@angular/core';
import { Monster } from '../../models/monster';
import { MonsterService } from '../../services/monster.service';
import { DecimalPipe, SlicePipe } from '@angular/common';
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
  page: number = 1;
  pageSize: number = 50;
  collectionSize: number = 0;

  constructor(private monsterService: MonsterService, private pipe: DecimalPipe) { 
  }

  ngOnInit(): void {
    this.getMonsters();
  }

  onSelect(monster: Monster): void {

    this.monsterService.getMonster(monster.id)
          .subscribe(monsterDTO => this.selectedMonster = monsterDTO);    
  }

  onDeselectMonster(): void{
    this.selectedMonster = undefined;
  }

  getMonsters(): void{
    this.monsterService.getMonsters()
          .subscribe(monsters => { 
            this.monsters = monsters.sort((monster1, monster2) => monster1.level - monster2.level);
            this.collectionSize = this.monsters.length;
            this.initTableDatasource();
          });
  }

  private initTableDatasource(){
    
    this.tableDatasource$ = this.filter.valueChanges.pipe(
      startWith(''),
      map(text => this.search(text, this.pipe)
                      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize))
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
