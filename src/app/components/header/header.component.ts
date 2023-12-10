import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EsperaViewComponent } from "../espera-view/espera-view.component";
import { FooterComponent } from "../footer/footer.component";
import { FormsModule, ReactiveFormsModule, Validators, FormGroup, FormControl } from '@angular/forms';
import { SpinnerComponent } from "../spinner/spinner.component";
import { DashboardComponent } from "../dashboard/dashboard.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,
    EsperaViewComponent,
    FooterComponent,
    FormsModule,
    ReactiveFormsModule,
    SpinnerComponent,
    DashboardComponent],
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
  //Variable para alerta de coordenadas no encontradas
  alertCoord: boolean = false;

  //Alerta de error al ingresar la direccion
  alertError: boolean = false;

  //Alerta de spinner
  showSpinner: boolean = false;

  //Alerta mostrar el dashboard
  showDashboard: boolean = false;
  //Se importa el servicio geocodingApiService en el constructor para poder usarlo


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
      this.showSpinner = true;

      setTimeout(() => {
        this.showSpinner = false;
        this.showDashboard = true;
      }, 3000);
    }
  }


}
