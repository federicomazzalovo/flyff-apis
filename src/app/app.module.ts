import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MonsterDetailComponent } from './monster-detail/monster-detail.component';

import { HttpClientModule } from '@angular/common/http';
import { MonstersComponent } from './monsters/monsters.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    MonsterDetailComponent,
    MonstersComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
