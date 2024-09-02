
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherForecast } from '../../models/weather-forecast.model';
import { WeatherService } from '../../services/weather.service';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
  standalone: true,
  imports: [CommonModule, HttpClientModule]
})


export class WeatherComponent implements OnInit {

  weatherForecasts: WeatherForecast[] = [];
  error: string | null = null;

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.weatherService.getWeatherForecasts().subscribe({
      next: data => {
        this.weatherForecasts = data;
        this.error = null;  // Clear any previous error messages
      },
      error: err => {
        this.error = 'Could not fetch weather data. Please try again later.';
      }
    });
  }
}
