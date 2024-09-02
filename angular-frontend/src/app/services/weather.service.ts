// src/app/services/weather.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { WeatherForecast } from '../models/weather-forecast.model';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private apiUrl = environment.apiUrl + 'weatherforecast';

  constructor(private http: HttpClient) { }

  getWeatherForecasts(): Observable<WeatherForecast[]> {
    return this.http.get<WeatherForecast[]>(this.apiUrl).pipe(
      catchError(error => {
        console.error('Error fetching weather data', error);
        return of([]);  // Return an empty array in case of error
      })
    );
  }
}
