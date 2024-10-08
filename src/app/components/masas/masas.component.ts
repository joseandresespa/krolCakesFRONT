import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalGenericoComponent } from '../modal-generico/modal-generico.component';
import { masa } from 'src/app/models/masa.interface';
import { ModalEditarComponent } from '../modal-editar/modal-editar.component'; // importar el componente de edición
import { CatalogosService } from 'src/services/catalogos.service';


@Component({
  selector: 'app-masas',
  templateUrl: './masas.component.html',
  styleUrls: ['./masas.component.css']
})
export class MasasComponent implements OnInit {
  displayedColumns: string[] = ['id', 'sabor_masa', 'acciones'];

  // Se inicializa el array para que quede vacio
  masas: masa [] = [];

  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 1;
  pages: number[] = [];
  dataSource: masa[] = [];

  constructor(public dialog: MatDialog,private service: CatalogosService) { }

  ngOnInit(): void {
    this.service.masas().subscribe((datos: masa[]) => {
      this.masas = datos;
      this.updatePagination();
    });
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.masas.length / this.itemsPerPage);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    this.paginate();
  }

  paginate(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.dataSource = this.masas.slice(startIndex, endIndex);
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


  abrirModal(): void {
    const dialogRef = this.dialog.open(ModalGenericoComponent, {
      width: '400px',
      data: {
        titulo: 'Agregar Masa',
        campos: ['sabor_masa']
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.nuevaMasa(result).subscribe(response => {
        const nuevo: masa = {
          id: this.masas.length + 1,
          sabor_masa: result.sabor_masa
        };
        this.masas.push(nuevo);
        this.updatePagination();
      }
    )};
  });
  }
//EDITAR
  abrirModalEditar(masa: masa): void {
    const dialogRef = this.dialog.open(ModalEditarComponent, {
      width: '400px',
      data: {
        titulo: 'Editar Masa',
        campos: ['sabor_masa'],
        valores: { sabor_masa: masa.sabor_masa } // Precargar el valor actual de la masa
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const editado = this.masas.find(r => r.id === masa.id);
        if (editado) {
          editado.sabor_masa = result.sabor_masa;
          this.updatePagination();
        }
        this.service.actualizarMasa(editado).subscribe(response => {
          const editado = this.masas.find(p => p.id === masa.id);
          if (editado) {
            editado.sabor_masa = result.sabor_masa;
            this.updatePagination();
          }
        });
      }
    });
  }
}
