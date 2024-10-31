import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { comprainventario } from 'src/app/models/comprainventario.interface';
import { InventarioService } from 'src/services/inventario.service';
import { AgregarComprasComponent } from './agregar-compras/agregar-compras.component';
import { DesgloceComprasComponent } from './desgloce-compras/desgloce-compras.component';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css']
})
export class ComprasComponent implements OnInit {
  displayedColumns: string[] = ['id', 'fecha', 'total', 'proveedor', 'acciones'];
  compras: comprainventario[] = []; 
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 1;
  pages: number[] = [];
  dataSource: comprainventario[] = [];
  
  searchQuery: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  constructor(public dialog: MatDialog, private service: InventarioService) {}

  ngOnInit(): void {
    this.service.compras().subscribe((compra: comprainventario[]) => {
      this.compras = compra;
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
  filteredAndSortedData(): comprainventario[] {
    return this.compras
      .filter(compra => 
        compra.nombre && compra.nombre.toLowerCase().includes(this.searchQuery.toLowerCase())
      )
      .sort((a, b) => {
        const nameA = a.nombre || ''; 
        const nameB = b.nombre || ''; 
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
    const dialogRef = this.dialog.open(AgregarComprasComponent, {
      width: '800px' // Ajusta el ancho aquí
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.ngOnInit(); // Vuelve a cargar las compras
        
      }
    });
  }
  

  // desgloce
  desgloce(compra: comprainventario): void {
    const dialogRef = this.dialog.open(DesgloceComprasComponent, {
      width: '500px', 
      data: compra 
    });
  
    dialogRef.afterClosed().subscribe(result => {
      
      console.log('El modal se cerró', result);
    });
  }
}
