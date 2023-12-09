import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EsperaViewComponent } from "../espera-view/espera-view.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,
    EsperaViewComponent,
    FooterComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

}
