import { Component } from '@angular/core';
import { WeatherComponent } from './weather/weather/weather.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [WeatherComponent]
})
export class AppComponent { }
