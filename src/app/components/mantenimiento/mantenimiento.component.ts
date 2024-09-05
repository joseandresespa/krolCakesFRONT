import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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
  dataSource: UsuarioCompleto[] = []; // Array con todos los datos
  filteredData: UsuarioCompleto[] = []; // Array con los datos filtrados
  selectedOrder: string = 'none'; // Orden seleccionado
  
  
  // Paginación
  currentPage = 1;
  itemsPerPage = 5;
  totalPages = Math.ceil(this.filteredData.length / this.itemsPerPage);
  pages: number[] = [];
  filterValue: string = ''; // Valor de búsqueda

  constructor(private dialog: MatDialog, private service: CatalogosService) { }

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.service.usuarios().subscribe(data => {
      this.dataSource = data;
      this.filteredData = data;
      this.totalPages = Math.ceil(this.filteredData.length / this.itemsPerPage);
      this.calculatePages();
    });
  }

  applyFilter(event: Event) {
    this.filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.filteredData = this.dataSource.filter(user => {
      return Object.values(user).some(value => 
        String(value).toLowerCase().includes(this.filterValue)
      );
    });
    this.sortData(); // Aplica el ordenamiento después de filtrar
    this.totalPages = Math.ceil(this.filteredData.length / this.itemsPerPage);
    this.calculatePages();
  }
  
  sortData() {
    if (this.selectedOrder === 'asc') {
      this.filteredData.sort((a, b) => (a.nombre ?? '').localeCompare(b.nombre ?? ''));
    } else if (this.selectedOrder === 'desc') {
      this.filteredData.sort((a, b) => (b.nombre ?? '').localeCompare(a.nombre ?? ''));
    }
  }

  calculatePages() {
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
      data: { ...user } // Pasa los datos del usuario al diálogo
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Actualiza el usuario en la dataSource
        const index = this.dataSource.findIndex(u => u.id_usuario === user.id);
        if (index !== -1) {
          this.dataSource[index] = result; // Reemplaza el usuario editado
          this.applyFilter({ target: { value: this.filterValue } } as any); // Vuelve a aplicar el filtro
        }
      }
    });
  }

  deleteUser(user: any) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent); // Abre el diálogo de confirmación

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Si el usuario confirma la eliminación, procede a eliminarlo
        this.dataSource = this.dataSource.filter(u => u.id_usuario !== user.id);
        this.filteredData = this.filteredData.filter(u => u.id_usuario !== user.id);
        this.totalPages = Math.ceil(this.filteredData.length / this.itemsPerPage);
        this.calculatePages();
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
          id: this.dataSource.length + 1, // Genera un nuevo ID
          ...result,                      // Los datos del nuevo usuario
          visibilidad: 'Visible'          // Asigna visibilidad por defecto
        });
        this.applyFilter({ target: { value: this.filterValue } } as any); // Vuelve a aplicar el filtro
      }
    });
  }

  
}
