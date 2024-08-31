import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AgregarUsuarioDialogComponent } from '../agregar-usuario-dialog/agregar-usuario-dialog.component';
import { EditarUsuarioDialogComponent } from '../editar-usuario-dialog/editar-usuario-dialog.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-mantenimiento',
  templateUrl: './mantenimiento.component.html',
  styleUrls: ['./mantenimiento.component.css']
})
export class MantenimientoComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nombre', 'correo', 'contraseña', 'visibilidad', 'rol', 'acciones'];
  dataSource: any[] = []; // Inicializa dataSource como un array vacío sin datos

  // Paginación
  currentPage = 1;
  itemsPerPage = 5;
  totalPages = Math.ceil(this.dataSource.length / this.itemsPerPage);
  pages: number[] = [];

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    this.calculatePages();
  }

  calculatePages() {
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  get paginatedData() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.dataSource.slice(startIndex, startIndex + this.itemsPerPage);
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
        const index = this.dataSource.findIndex(u => u.id === user.id);
        if (index !== -1) {
          this.dataSource[index] = result; // Reemplaza el usuario editado
        }
      }
    });
  }

  deleteUser(user: any) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent); // Abre el diálogo de confirmación

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Si el usuario confirma la eliminación, procede a eliminarlo
        this.dataSource = this.dataSource.filter(u => u.id !== user.id);
        // Actualiza la paginación después de eliminar
        this.totalPages = Math.ceil(this.dataSource.length / this.itemsPerPage);
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

        // Recalcula la paginación
        this.totalPages = Math.ceil(this.dataSource.length / this.itemsPerPage);
        this.calculatePages();
      }
    });
  }
}

