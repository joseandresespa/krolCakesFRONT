import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CatalogosService } from 'src/services/catalogos.service';
import { rol } from 'src/app/models/rol.interface'; 
import { Usuario } from 'src/app/models/usuario.interface';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-agregar-usuario-dialog',
  templateUrl: './agregar-usuario-dialog.component.html',
  styleUrls: ['./agregar-usuario-dialog.component.css']
})
export class AgregarUsuarioDialogComponent implements OnInit {
  usuarioForm!: FormGroup;
  roles: rol[] = [];  
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AgregarUsuarioDialogComponent>,
    private service: CatalogosService 
  ) { }

  ngOnInit(): void {
    this.usuarioForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      contrasenia: ['', Validators.required],
      id_rol: ['', Validators.required],
    });
    // Cargar los roles
    this.service.roles().subscribe((data: rol[]) => {
      this.roles = data;
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  
  onSubmit(): void {
    if (this.usuarioForm.valid) {
      this.service.NuevoUsuario(this.usuarioForm.value).subscribe(
        response => {
          Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: 'Usuario agregado correctamente.'
          });
          this.dialogRef.close(this.usuarioForm.value);
        },
        error => {
          Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: 'Usuario agregado correctamente.'
          });
        }
      );
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}

