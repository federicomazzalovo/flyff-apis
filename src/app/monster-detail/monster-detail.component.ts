import { Component, Input, OnInit } from '@angular/core';
import { Monster } from '../monster';

@Component({
  selector: 'app-monster-detail',
  templateUrl: './monster-detail.component.html',
  styleUrls: ['./monster-detail.component.css']
})
export class MonsterDetailComponent implements OnInit {

  constructor() {     
  }

  @Input() monster?: Monster;

  ngOnInit(): void {
  }

}
