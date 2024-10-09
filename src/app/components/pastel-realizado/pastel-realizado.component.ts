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

  pasteles: pastelrealizado[] = [
    { id: 1, id_tipo_evento: 1, id_pedido: 101, imagen: 'img1.jpg' },
    { id: 2, id_tipo_evento: 2, id_pedido: 102, imagen: 'img2.jpg' },
    { id: 3, id_tipo_evento: 3, id_pedido: 103, imagen: 'img3.jpg' }
  ];

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
