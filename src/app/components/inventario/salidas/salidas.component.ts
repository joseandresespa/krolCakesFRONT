import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InventarioService } from 'src/services/inventario.service';
import { AgregarSalidaComponent } from './agregar-salida/agregar-salida.component'; 
import { DesgloseSalidaComponent } from './desglose-salida/desglose-salida.component'; 
import { salidainventario } from 'src/app/models/salidainventario.interface';
@Component({
  selector: 'app-salidas',
  templateUrl: './salidas.component.html',
  styleUrls: ['./salidas.component.css']
})
export class SalidasComponent implements OnInit {
  displayedColumns: string[] = ['id', 'fecha', 'notas', 'acciones'];
  salidas: salidainventario[] = []; 
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 1;
  pages: number[] = [];
  dataSource: salidainventario[] = [];
  
  searchQuery: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  constructor(public dialog: MatDialog, private service: InventarioService) {}

  ngOnInit(): void {
    this.service.salidas().subscribe((salida: salidainventario[]) => {
      this.salidas = salida;
      this.updatePagination();
    });
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredAndSortedData().length / this.itemsPerPage);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    this.paginate();
  }

  paginate(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.dataSource = this.filteredAndSortedData().slice(startIndex, endIndex);
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

  // Filtrado por búsqueda y orden
  filteredAndSortedData(): salidainventario[] {
    return this.salidas
      .filter(salida => 
        salida.fecha && salida.fecha.toLowerCase().includes(this.searchQuery.toLowerCase())
      )
      .sort((a, b) => {
        const nameA = a.fecha || ''; 
        const nameB = b.fecha || ''; 
        const comparison = nameA.localeCompare(nameB);
        return this.sortDirection === 'asc' ? comparison : -comparison;
      });
  }

  onSearchQueryChange(query: string): void {
    this.searchQuery = query;
    this.updatePagination();
  }

  toggleSortDirection(): void {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.updatePagination();
  }

  AgregarModal(): void {
    const dialogRef = this.dialog.open(AgregarSalidaComponent, {
      width: '800px' // Ajusta el ancho aquí
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.ngOnInit(); // Vuelve a cargar las compras
          
      }
    });
  }
  

  // desgloce
  desgloce(salida: salidainventario): void {
    const dialogRef = this.dialog.open(DesgloseSalidaComponent, {
      width: '500px', 
      data: salida 
    });
  
    dialogRef.afterClosed().subscribe(result => {
      
      console.log('El modal se cerró', result);
    });
  }
}
