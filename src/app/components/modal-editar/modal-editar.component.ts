import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal-editar',
  templateUrl: './modal-editar.component.html',
  styleUrls: ['./modal-editar.component.css']
})
export class ModalEditarComponent implements OnInit {
  form!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ModalEditarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    // Crear dinámicamente los campos del formulario y precargar los valores existentes
    this.form = this.fb.group({});
    this.data.campos.forEach((campo: string) => {
      this.form.addControl(campo, this.fb.control(this.data.valores[campo] || '', Validators.required));
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.form.valid) {
      // Envía los datos del formulario al componente que lo llamó
      this.dialogRef.close(this.form.value);
    }
  }
}
