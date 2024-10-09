import { Component, OnInit } from '@angular/core';
import { pastelrealizado } from 'src/app/models/pastelrealizado.interface';
import { MatDialog } from '@angular/material/dialog';  // Importa MatDialog
import { ModalAgregarPastelComponent } from './modal-agregar-pastel/modal-agregar-pastel.component';  
import { ModalEditarPastelComponent } from './modal-editar-pastel/modal-editar-pastel.component';    


@Component({
  selector: 'app-pastel-realizado',
  templateUrl: './pastel-realizado.component.html',
  styleUrls: ['./pastel-realizado.component.css']
})
export class PastelRealizadoComponent implements OnInit {
  displayedColumns: string[] = ['id', 'id_tipo_evento', 'id_pedido', 'imagen', 'acciones'];

  pasteles: pastelrealizado[] = [];

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }


  abrirModalAgregar() {
    this.dialog.open(ModalAgregarPastelComponent); 
  }

  abrirModalEditar(pastel: pastelrealizado) {
    this.dialog.open(ModalEditarPastelComponent, {
      data: { pastel }  
    });
  }

}
