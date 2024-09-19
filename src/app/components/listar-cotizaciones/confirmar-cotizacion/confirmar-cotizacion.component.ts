import { Component, Input, OnInit } from '@angular/core';
import { cotizaciononline } from 'src/app/models/cotizaciononline.interface';

@Component({
  selector: 'app-confirmar-cotizacion',
  templateUrl: './confirmar-cotizacion.component.html',
  styleUrls: ['./confirmar-cotizacion.component.css']
})
export class ConfirmarCotizacionComponent implements OnInit {
  @Input() cotizacion!: cotizaciononline; // Recibir la cotización como input

  constructor() { }

  ngOnInit(): void {
  }

  confirmar(): void {
    // Lógica para confirmar la cotización
    console.log('Cotización confirmada:', this.cotizacion);
  }

  cancelar(): void {
    // Lógica para cancelar la cotización
    console.log('Cotización cancelada');
  }
}
