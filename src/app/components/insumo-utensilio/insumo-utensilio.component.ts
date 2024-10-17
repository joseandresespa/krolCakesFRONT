import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';  // Importamos el servicio de diálogos
import { ModalAgregarInsumoComponent } from './modal-agregar-insumo/modal-agregar-insumo.component';
import { ModalEditarInsumoComponent } from './modal-editar-insumo/modal-editar-insumo.component';
import { insumoutensilio } from 'src/app/models/insumoutensilio.interface';

@Component({
  selector: 'app-insumo-utensilio',
  templateUrl: './insumo-utensilio.component.html',
  styleUrls: ['./insumo-utensilio.component.css']
})
export class InsumoUtensilioComponent implements OnInit {

 
  insumosUtensilios: insumoutensilio[] = [];//Array vacio

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void { }

  // Abrir modal para agregar
  openAddModal() {
    const dialogRef = this.dialog.open(ModalAgregarInsumoComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Modal de agregar cerrado');
    });
  }

  // Abrir modal para editar
  openEditModal(insumo: insumoutensilio) {
    const dialogRef = this.dialog.open(ModalEditarInsumoComponent, {
      width: '400px',
      data: insumo
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Modal de editar cerrado');
    });
  }

}

