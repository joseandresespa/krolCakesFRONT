import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-agregar-usuario-dialog',
  templateUrl: './agregar-usuario-dialog.component.html',
  styleUrls: ['./agregar-usuario-dialog.component.css']
})
export class AgregarUsuarioDialogComponent implements OnInit {
  usuarioForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AgregarUsuarioDialogComponent>
  ) { }

  ngOnInit(): void {
    this.usuarioForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', Validators.required],
      rol: ['', Validators.required],
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  onSubmit(): void {
    if (this.usuarioForm.valid) {
      this.dialogRef.close(this.usuarioForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}

