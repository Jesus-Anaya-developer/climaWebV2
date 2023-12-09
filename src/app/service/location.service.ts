import { Injectable, inject } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  //se inyecta la dependencia para hacer llamados a la api
  private http = inject(HttpClient);

  //metodo para obtener las coordenadas
  getCoordinates(location: string) {

    // Acceso a la api
    const token = 'pk.267350e1cb3b29a6ca4e3c41d0448f97&q=';

    // formato de la respuesta
    const format = '&format=json&';

    // url de la api a donde se hara el llamado
    const url = 'https://us1.locationiq.com/v1/search?key=' + token + location + format;

    //retornar la respuesta
    return this.http.get<any>(url);
  }
}
