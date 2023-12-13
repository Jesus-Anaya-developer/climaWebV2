import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../header/header.component";
import { LocationService } from "../../service/location.service";
import { WeatherService } from "../../service/weather.service";
import { EsperaViewComponent } from "../espera-view/espera-view.component";
import { GraficaComponent } from "../grafica/grafica.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule,
    HeaderComponent,
    EsperaViewComponent,
    GraficaComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  //Guarda la variable de la ubicacion que escribe el usuario
  @Input() location: string = "";
  forecastData: any = [];

  //alerta en caso de que la coordenada no se encuentre
  alertCoord: boolean = false;

  //Alerta en caso de error de la api
  alertError: boolean = false;
  message: string = '';

  //avisa si hay data en el forecast para mostrar componente
  showForecast: boolean = false;

  lat: string = '';
  lon: string = '';
  weatherData: any = {};

  //Arrays que le pasaremos a la grafica con los datos
  labelsData: any = [];
  chartDataTemp: any = [];

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
        this.weatherData = data;
        this.forecastData = data.forecast;

        /*console.log(this.forecastData.forecastday[0].hour[0].time.split(' ')[1]);
        for (let index = 0; index < this.forecastData.forecastday[0].hour[index].lenght; index++) {
          this.labelsData.push(this.forecastData.forecastday[0].hour[index].time.split(' ')[1]);
        }*/

        //funciones para llenar el array solo con la temperatura y la hora
        this.forecastData.forecastday[0].hour.map((element: any) => {
          //llena el array de la hora
          this.labelsData.push(element.time.split(' ')[1]);
          //llena el array de la temperatura
          this.chartDataTemp.push(element.temp_c);
        })

        this.showForecast = true;
      },
      error: (error) => {
        console.log(error);
        this.alertError = true;
        this.message = 'Error: ' + error.status + ' ' + error.error.error;
      }
    })
  }

}
