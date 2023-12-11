import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../header/header.component";
import { LocationService } from "../../service/location.service";
import { WeatherService } from "../../service/weather.service";
import { EsperaViewComponent } from "../espera-view/espera-view.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule,
    HeaderComponent,
    EsperaViewComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  //Guarda la variable de la ubicacion que escribe el usuario
  @Input() location: string = "";

  //alerta en caso de que la coordenada no se encuentre
  alertCoord: boolean = false;

  //Alerta en caso de error de la api
  alertError: boolean = false;
  message: string = '';

  lat: string = '';
  lon: string = '';
  weatherData: any = {};

  constructor(private locationService: LocationService,
    private weatherService: WeatherService) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    //iniciando el componente llama al metodo para obtener coordenadas
    this.getCoord(this.location);
  }

  //metodo para obtener las coordenadas
  getCoord(location: string) {
    //se le pasa la ubicacion que viene del componente header
    this.locationService.getCoordinates(location).subscribe({
      next: (data) => {

        // se ontiene la latitud y la longitud del primer array
        this.lat = data[0].lat;
        this.lon = data[0].lon;
        //se llama a la funcion que nos devuelve el clima
        this.getWeather(this.lat, this.lon);
      },
      error: (error) => {
        console.log(error);
        this.alertError = true;
        this.message = 'Error: ' + error.status + ' ' + error.error.error;
      }
    });
  }

  getWeather(lat: string, lon: string) {
    this.weatherService.getWeather(this.lat, this.lon).subscribe({
      next: (data) => {
        console.log(data);
        this.weatherData = data;
      },
      error: (error) => {
        console.log(error);
        this.alertError = true;
        this.message = 'Error: ' + error.status + ' ' + error.error.error;
      }
    })
  }

}
