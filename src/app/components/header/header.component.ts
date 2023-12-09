import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EsperaViewComponent } from "../espera-view/espera-view.component";
import { FooterComponent } from "../footer/footer.component";
import { FormsModule, ReactiveFormsModule, Validators, FormGroup, FormControl } from '@angular/forms';
import { LocationService } from "../../service/location.service";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,
    EsperaViewComponent,
    FooterComponent,
    FormsModule,
    ReactiveFormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  //Se declara variable para mostrar alerta
  alertForm: boolean = false;

  //Se declara variable de ubicación
  location: string = '';
  coord: any = {};
  errorData: any = {};
  alertCoord: boolean = false;
  alertError: boolean = false;

  //Se importa el servicio geocodingApiService en el constructor para poder usarlo
  constructor(private geocodingApiService: LocationService) {
  }

  //logica del formulario
  locationForm = new FormGroup({
    //se declara la variable de validación
    location: new FormControl('', {
      nonNullable: true,
      validators: [
        //validaciones
        Validators.required,
        Validators.pattern('[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ0-9 ,.]*'),
      ]
    })
  });

  /*metodo para mostrar alerta
  y pasar ubicacion a componente hijo*/
  showLocation(locationForm: any) {
    //validacion de error en formulario
    if (!this.locationForm.valid) {
      this.alertForm = true;
      this.alertCoord = false;
      this.alertError = false;
      //limpieza de formulario y termina ejecucion
      return void 0;
    } else {
      this.alertForm = false;
      //Se pasa la ubicación al componente hijo
      this.location = locationForm.location;

      //Se pasa la ubicación al servicio geocodingApiService y se subscribe
      this.geocodingApiService.getCoordinates(this.location).subscribe({
        next: (data) => {
          //manipulación de datos
          this.coord = data;
          this.alertCoord = true;
          this.alertError = false;
        },
        error: (error) => {
          this.errorData = error;
          this.alertError = true;
        }
      });
    }
  }


}
