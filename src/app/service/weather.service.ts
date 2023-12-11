import { Injectable, inject } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  //se inyecta la dependencia para hacer llamados a la api
  private http = inject(HttpClient);

  constructor() { }

  getWeather(lat: string, lon: string) {

    // Acceso a la api
    const token = '7befc126e1694804aad30437232111';

    // url de la api a donde se hara el llamado
    const url = 'http://api.weatherapi.com/v1/forecast.json?key=' + token + '&lang=es&q=' + lat + ',' + lon;

    return this.http.get<any>(url);
  }
}
