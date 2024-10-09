import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { acceso } from 'src/app/models/acceso.interface';

@Component({
  selector: 'app-modal-editar-acceso',
  templateUrl: './modal-editar-acceso.component.html',
  styleUrls: ['./modal-editar-acceso.component.css']
})
export class ModalEditarAccesoComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { acceso: acceso }) {}
}
    