import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SwapiService {
  private baseUrl: string = 'https://swapi.dev/api';

  constructor(private http: HttpClient) { }

  getCharacters(): Observable<any> {
    return this.http.get(`${this.baseUrl}/people/`).pipe(
      catchError(this.handleError)
    );
  }

  getCharacter(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/people/${id}/`).pipe(
      catchError(this.handleError)
    );
  }

  getMovies(): Observable<any> {
    return this.http.get(`${this.baseUrl}/films/`).pipe(
      catchError(this.handleError)
    );
  }

  getSpecies(): Observable<any> {
    return this.http.get(`${this.baseUrl}/species/`).pipe(
      catchError(this.handleError)
    );
  }
  getSpeciesByUrl(url: string): Observable<any> {
    return this.http.get(url);
  }

  getMovieByUrl(url: string): Observable<any> {
    return this.http.get(url);
  }

  getStarshipByUrl(url: string): Observable<any> {
    return this.http.get(url);
  }
  getVehicleByUrl(url: string): Observable<any> {
    return this.http.get(url);
  }
  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error.error);
    return throwError('Something bad happened; please try again later.');
  }
}
