import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalGenericoComponent } from '../modal-generico/modal-generico.component';
import { ModalEditarComponent } from '../modal-editar/modal-editar.component'; 
import { relleno } from 'src/app/models/relleno.interface';
import { CatalogosService } from 'src/services/catalogos.service';

@Component({
  selector: 'app-relleno',
  templateUrl: './relleno.component.html',
  styleUrls: ['./relleno.component.css']
})
export class RellenoComponent implements OnInit {
  displayedColumns: string[] = ['id', 'sabor_relleno', 'acciones'];
  
  // Se inicializa el array con un dato de prueba
  rellenos: relleno[] = []; 

  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 1;
  pages: number[] = [];
  dataSource: relleno[] = [];

  constructor(public dialog: MatDialog,private service: CatalogosService) { }

  ngOnInit(): void {
    this.service.rellenos().subscribe((datos: relleno[]) => {
      this.rellenos = datos;
      this.updatePagination();
    });
  }
  updatePagination(): void {
    this.totalPages = Math.ceil(this.rellenos.length / this.itemsPerPage);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    this.paginate();
  }

  paginate(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.dataSource = this.rellenos.slice(startIndex, endIndex);
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginate();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.paginate();
    }
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.paginate();
  }

  eliminarRelleno(relleno: relleno): void {
    console.log('Relleno eliminado:', relleno);
    this.rellenos = this.rellenos.filter(r => r.id !== relleno.id);
    this.updatePagination();
  }

  abrirModalAgregar(): void {
    const dialogRef = this.dialog.open(ModalGenericoComponent, {
      width: '400px',
      data: {
        titulo: 'Agregar Relleno',
        campos: ['sabor_relleno']
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.nuevoRelleno(result).subscribe(response => {
        const nuevo: relleno = {
          id: this.rellenos.length + 1,
          sabor_relleno: result.sabor_relleno
        };
        this.rellenos.push(nuevo);
        this.updatePagination();
      }
    )};
  });

  }
//EDITAR
  abrirModalEdicion(relleno: relleno): void {
    const dialogRef = this.dialog.open(ModalEditarComponent, {
      width: '400px',
      data: {
        titulo: 'Editar Relleno',
        campos: ['sabor_relleno'],
        valores: { sabor_relleno: relleno.sabor_relleno } // Precargar el valor actual del relleno
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const editado = this.rellenos.find(r => r.id === relleno.id);
        if (editado) {
          editado.sabor_relleno = result.sabor_relleno;
          this.updatePagination();
        }
        this.service.actualizarRelleno(editado).subscribe(response => {
          const editado = this.rellenos.find(p => p.id === relleno.id);
          if (editado) {
            editado.sabor_relleno = result.sabor_relleno;
            this.updatePagination();
          }
        });
      }
    });
  }
}
