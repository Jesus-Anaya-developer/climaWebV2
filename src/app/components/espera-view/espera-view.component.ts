import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertasComponent } from "../alertas/alertas.component";

@Component({
  selector: 'app-espera-view',
  standalone: true,
  imports: [CommonModule, AlertasComponent],
  templateUrl: './espera-view.component.html',
  styleUrl: './espera-view.component.css'
})
export class EsperaViewComponent {

  @Input() alertForm: boolean = false;
  messageAlert: string = "Error, solo se permite ingresar letras, numeros, espacios y comas.";
  showAlert: boolean = false;

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    console.log(this.alertForm);
    if (this.alertForm == true) {
      this.showAlert = true;
      setTimeout(() => {
        this.showAlert = false;
      }, 3000)
    }
  }
}
