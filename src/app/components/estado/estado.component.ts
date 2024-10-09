import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { estado } from 'src/app/models/estado.interface';
import { ModalAgregarEstadoComponent } from './modal-agregar-estado/modal-agregar-estado.component';
import { ModalEditarEstadoComponent } from './modal-editar-estado/modal-editar-estado.component';

@Component({
  selector: 'app-estado',
  templateUrl: './estado.component.html',
  styleUrls: ['./estado.component.css']
})
export class EstadoComponent implements OnInit {
  displayedColumns: string[] = ['id', 'estado', 'acciones'];
  estados: estado[] = [
    { id: 1, estado: 'Activo' },
    { id: 2, estado: 'Inactivo' }
  ];
  
  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  // Abrir modal de agregar
  agregarEstado(): void {
    const dialogRef = this.dialog.open(ModalAgregarEstadoComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.estados.push(result);
      }
    });
  }

  // Abrir modal de editar
  editarEstado(estado: estado): void {
    const dialogRef = this.dialog.open(ModalEditarEstadoComponent, {
      width: '400px',
      data: estado
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const index = this.estados.findIndex(e => e.id === result.id);
        if (index !== -1) {
          this.estados[index] = result;
        }
      }
    });
  }
}

