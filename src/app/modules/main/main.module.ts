import { SharedModule } from './../shared/shared.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LoginComponent } from './pages/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './pages/home/home.component';
import { BooksComponent } from './pages/books/books.component';
import { PokemonsComponent } from './pages/pokemons/pokemons.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { ProfileComponent } from './pages/profile/profile.component';


@NgModule({
  declarations: [
    LoginComponent,
    HomeComponent,
    BooksComponent,
    PokemonsComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  exports: [
    LoginComponent,
    HomeComponent,
    BooksComponent,
    PokemonsComponent,
    ProfileComponent
  ]
})
export class MainModule { }
