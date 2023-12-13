import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

// Necesitamos importar Chart desde chart.js
import { Chart, ChartType } from 'chart.js/auto';

@Component({
  selector: 'app-grafica',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './grafica.component.html',
  styleUrl: './grafica.component.css'
})
export class GraficaComponent implements OnInit {

  @Input() forecastLabelData: [] = [];
  @Input() forecastDataTemp: [] = [];

  // Atributo que almacena los datos del chart
  public chart: Chart | undefined;

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.


    console.log("estas en el oninit de grafica component");
    console.log(this.forecastLabelData);
    console.log(this.forecastDataTemp);



    const data = {
      labels: this.forecastLabelData,
      datasets: [{
        label: 'Pronostico de temperatura',
        data: this.forecastDataTemp,
        fill: false,
        borderColor: 'rgb(22, 78, 99)',
        tension: 0.1
      }]
    };
    // Creamos la gráfica
    this.chart = new Chart("chart", {
      type: 'line' as ChartType, // tipo de la gráfica
      data: data // datos
    });

  }

}
