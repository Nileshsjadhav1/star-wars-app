import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SwapiService } from '../swapi.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  @Output() filterChange = new EventEmitter<any>();

  movies: any[] = [];
  speciesList: any[] = [];
  filterCriteria = {
    movie: '',
    species: '',
    birthYearRange: { start: null, end: null }
  };

  constructor(private swapiService: SwapiService) { }

  ngOnInit(): void {
    this.swapiService.getMovies().subscribe(data => {
      this.movies = data.results;
    });

    this.swapiService.getSpecies().subscribe(data => {
      this.speciesList = data.results;
    });
  }

  applyFilter() {
    this.filterChange.emit(this.filterCriteria);
  }
}
