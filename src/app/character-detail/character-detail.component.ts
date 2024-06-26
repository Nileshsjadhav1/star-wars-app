import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SwapiService } from '../swapi.service';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.css']
})
export class CharacterDetailComponent implements OnInit {
  character: any = {};
  species: string[] = [];
  movies: string[] = [];
  starships: string[] = [];
  vehicle: string[] = [];

  constructor(private route: ActivatedRoute, private swapiService: SwapiService) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.swapiService.getCharacter(id).subscribe(data => {
      this.character = data;
      console.log(this.character);
   
      this.fetchSpeciesDetails();

      this.fetchMoviesDetails();

      this.fetchStarshipsDetails();

      this.fetchVehicleDetails();
    });
  }

  fetchSpeciesDetails(): void {
    this.character.species.forEach(speciesUrl => {
      this.swapiService.getSpeciesByUrl(speciesUrl).subscribe((speciesData: any) => {
        this.species.push(speciesData.name);
      });
    });
  }

  fetchMoviesDetails(): void {
    this.character.films.forEach(movieUrl => {
      this.swapiService.getMovieByUrl(movieUrl).subscribe((movieData: any) => {
        this.movies.push(movieData.title);
      });
    });
  }

  fetchStarshipsDetails(): void {
    this.character.starships.forEach(starshipUrl => {
      this.swapiService.getStarshipByUrl(starshipUrl).subscribe((starshipData: any) => {
        this.starships.push(starshipData.name);
      });
    });
  }

  fetchVehicleDetails(): void {
    this.character.vehicles.forEach(vehicleUrl => {
      this.swapiService.getVehicleByUrl(vehicleUrl).subscribe((vehicleData: any) => {
        console.log(vehicleData)
        this.vehicle.push(vehicleData.name);
      });
    });
  }
}
