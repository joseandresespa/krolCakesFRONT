import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalAgregarInsumoComponent } from './modal-agregar-insumo/modal-agregar-insumo.component';
import { ModalEditarInsumoComponent } from './modal-editar-insumo/modal-editar-insumo.component';
import { insumoutensilio } from 'src/app/models/insumoutensilio.interface';
import { CatalogosService } from 'src/services/catalogos.service';


@Component({
  selector: 'app-insumo-utensilio',
  templateUrl: './insumo-utensilio.component.html',
  styleUrls: ['./insumo-utensilio.component.css']
})
export class InsumoUtensilioComponent implements OnInit {

  insumosUtensilios: insumoutensilio[] = [];
  displayedColumns: string[] = ['id', 'tipo','nombre','nombre_unidad_medida','precio_unitario',
    'cantidad', 'inventarioRenovable','fecha_ing','fecha_ven', 'acciones'];

  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 1;
  pages: number[] = [];
  dataSource: insumoutensilio[] = [];

  constructor(public dialog: MatDialog ,private service: CatalogosService) {}

  ngOnInit(): void {
    this.service.insumos().subscribe((insumo: insumoutensilio[]) => {
      this.insumosUtensilios = insumo;
      this.updatePagination();
    });
  }
  
  

  updatePagination(): void {
    this.totalPages = Math.ceil(this.insumosUtensilios.length / this.itemsPerPage);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    this.paginate();
  }

  paginate(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.dataSource = this.insumosUtensilios.slice(startIndex, endIndex);
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



  openAddModal() {
    const dialogRef = this.dialog.open(ModalAgregarInsumoComponent, {
      width: '400px'
    });
   
    dialogRef.afterClosed().subscribe(result => {
      console.log('Modal de agregar cerrado');
      
      if (result) { // Verifica si hay datos devueltos
        this.service.nuevoInsumo(result).subscribe({
          next: (response) => {
            console.log('Insumo agregado con éxito:', response);
            // Aquí puedes manejar la respuesta, actualizar la lista de insumos, etc.
          },
          error: (error) => {
            console.error('Error al agregar insumo:', error);
            // Maneja el error aquí
          }
        });
      }
    });
  }
  

  openEditModal(insumo: insumoutensilio) {
    const dialogRef = this.dialog.open(ModalEditarInsumoComponent, {
      width: '400px',
      data: { ...insumo }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('Modal de agregar cerrado', result); // Aquí deberías ver los datos que envías
    
      if (result) { // Verifica si hay datos devueltos
        this.service.Actualizarinsumo(result).subscribe({
          next: (response) => {
            console.log('Insumo agregado con éxito:', response);
            // Aquí puedes manejar la respuesta, actualizar la lista de insumos, etc.
          },
          error: (error) => {
            console.error('Error al agregar insumo:', error);
            // Maneja el error aquí
          }
        });
      }
    });
    
  }
  


}
