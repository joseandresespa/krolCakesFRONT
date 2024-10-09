import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { estado } from 'src/app/models/estado.interface';
import { ModalAgregarEstadoComponent } from './modal-agregar-estado/modal-agregar-estado.component';
import { ModalEditarEstadoComponent } from './modal-editar-estado/modal-editar-estado.component';
import { ModalGenericoComponent } from '../modal-generico/modal-generico.component';
import { ModalEditarComponent } from '../modal-editar/modal-editar.component'; 
import { CatalogosService } from 'src/services/catalogos.service';
@Component({
  selector: 'app-estado',
  templateUrl: './estado.component.html',
  styleUrls: ['./estado.component.css']
})
export class EstadoComponent implements OnInit {
  displayedColumns: string[] = ['id', 'estado', 'acciones'];
  estados: estado[] = [];
  
  
  constructor(public dialog: MatDialog,private service: CatalogosService) { }

  ngOnInit(): void {
    this.service.estado().subscribe((datos: estado[]) => {
      this.estados = datos;
    });
  }

  // Abrir modal de agregar
  agregarEstado(): void {
    const dialogRef = this.dialog.open(ModalGenericoComponent, {
      width: '400px',
      data: {
        titulo: 'Agregar estado',
        campos: ['estado']
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.nuevoEstado(result).subscribe(response => {
        const nuevo: estado = {
          id: this.estados.length + 1,
          estado: result.estado
        };
        this.estados.push(nuevo);
      }
    )};
  });

  }

  // Abrir modal de editar
  editarEstado(estado: estado): void {
    const dialogRef = this.dialog.open(ModalEditarComponent, {
      width: '400px',
      data: {
        titulo: 'Editar Estado',
        campos: ['estado'],
        valores: { estado: estado.estado } 
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const editado = this.estados.find(r => r.id === estado.id);
        if (editado) {
          editado.estado = result.estado;
        }
        this.service.actualizarEstado(editado).subscribe(response => {
          const editado = this.estados.find(p => p.id === estado.id);
          if (editado) {
            editado.estado = result.estado;
          }
        });
      }
    });
  }
}

