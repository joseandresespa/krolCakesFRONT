import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { rol } from 'src/app/models/rol.interface';

@Component({
  selector: 'app-modal-editar-rol',
  templateUrl: './modal-editar-rol.component.html',
  styleUrls: ['./modal-editar-rol.component.css']
})
export class ModalEditarRolComponent  {

  constructor(@Inject(MAT_DIALOG_DATA) public data: { rol: rol }) { }

  ngOnInit(): void {
  }

}
