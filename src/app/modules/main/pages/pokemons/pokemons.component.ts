import { Component, OnInit } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';

import { Pokemon } from './../../../shared/models/pokemon';
import { PokemonService } from './../../../shared/services/pokemon.service';

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.scss'],
})
export class PokemonsComponent implements OnInit {
  pokemon: Pokemon = {id: '', name: '', type: '', img: ''};

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {}

  getPokemon(event: Event) {
    this.pokemon = {id: '', name: '', type: '', img: ''};
    const filterPokemon = (
      event.target as HTMLInputElement
    ).value.toLowerCase();

    this.pokemonService.get(filterPokemon).subscribe((resp) => {
      this.pokemon = resp;
    });
  }

  clearFilter() {

  }
}
