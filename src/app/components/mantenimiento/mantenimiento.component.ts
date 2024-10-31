import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AgregarUsuarioDialogComponent } from '../agregar-usuario-dialog/agregar-usuario-dialog.component';
import { EditarUsuarioDialogComponent } from '../editar-usuario-dialog/editar-usuario-dialog.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { Usuario, UsuarioCompleto } from 'src/app/models/usuario.interface'; 
import { CatalogosService } from 'src/services/catalogos.service'; 

@Component({
  selector: 'app-mantenimiento',
  templateUrl: './mantenimiento.component.html',
  styleUrls: ['./mantenimiento.component.css']
})
export class MantenimientoComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nombre', 'correo', 'contraseña', 'visibilidad', 'rol', 'acciones'];
  dataSource: UsuarioCompleto[] = [];
  filteredData: UsuarioCompleto[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 1;
  pages: number[] = [];
  filterValue: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  constructor(public dialogRef: MatDialogRef<AgregarUsuarioDialogComponent>,private dialog: MatDialog, private service: CatalogosService) { }

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  cargarUsuarios(): void {
    this.service.usuarios().subscribe(data => {
      this.dataSource = data;
      this.filteredData = data;
      this.updatePagination();
    });
  }

  applyFilter(event: Event) {
    this.filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.filteredData = this.dataSource.filter(user => {
      return Object.values(user).some(value => 
        String(value).toLowerCase().includes(this.filterValue)
      );
    });
    this.sortData();
    this.updatePagination();
  }

  sortData() {
    this.filteredData.sort((a, b) => {
      const nameA = a.nombre ?? '';
      const nameB = b.nombre ?? '';
      return this.sortDirection === 'asc' ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
    });
    this.updatePagination();
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredData.length / this.itemsPerPage);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  get paginatedData() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredData.slice(startIndex, startIndex + this.itemsPerPage);
  }

  goToPage(page: number) {
    this.currentPage = page;
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  editUser(user: any) {
    const dialogRef = this.dialog.open(EditarUsuarioDialogComponent, {
      width: '400px',
      data: { ...user }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const index = this.dataSource.findIndex(u => u.id_usuario === user.id);
        if (index !== -1) {
          this.dataSource[index] = result;
          this.applyFilter({ target: { value: this.filterValue } } as any);
        }
      }
    });
  }

  openAddUserDialog(): void {
    const dialogRef = this.dialog.open(AgregarUsuarioDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataSource.push({
          id: this.dataSource.length + 1,
          ...result,
          visibilidad: 'Visible'
        });
        this.applyFilter({ target: { value: this.filterValue } } as any);
      }
    });
  }

  toggleSortDirection(): void {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.sortData();
  }
}
