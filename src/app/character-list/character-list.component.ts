import { Component, OnInit } from '@angular/core';
import { SwapiService } from '../swapi.service';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css']
})
export class CharacterListComponent implements OnInit {
  characters: any[] = [];
  filteredCharacters: any[] = [];
  displayedColumns: string[] = ['serialNumber', 'name', 'species', 'birthYear'];

  constructor(private swapiService: SwapiService) { }

  ngOnInit(): void {
    this.swapiService.getCharacters().subscribe(data => {
      this.characters = data.results;
      this.filteredCharacters = this.characters;
      console.log(this.filteredCharacters)
    });
  }

  onFilterChange(filter: any) {
    this.filteredCharacters = this.characters.filter(character => {
      let matchesMovie = true;
      let matchesSpecies = true;
      let matchesBirthYear = true;

      if (filter.movie) {
        matchesMovie = character.films.includes(filter.movie);
      }

      if (filter.species) {
        matchesSpecies = character.species.includes(filter.species);
      }

      if (filter.birthYearRange.start || filter.birthYearRange.end) {
        const birthYear = parseFloat(character.birth_year);
        if (filter.birthYearRange.start) {
          matchesBirthYear = matchesBirthYear && birthYear >= filter.birthYearRange.start;
        }
        if (filter.birthYearRange.end) {
          matchesBirthYear = matchesBirthYear && birthYear <= filter.birthYearRange.end;
        }
      }

      return matchesMovie && matchesSpecies && matchesBirthYear;
    });
  }
}
