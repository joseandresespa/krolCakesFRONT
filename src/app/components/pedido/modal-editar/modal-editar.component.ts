import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { pedido } from 'src/app/models/pedido.interface';

@Component({
  selector: 'app-modal-editar',
  templateUrl: './modal-editar.component.html',
  styleUrls: ['./modal-editar.component.css']
})
export class ModalEditarComponent implements OnInit {
  editarForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ModalEditarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: pedido
  ) {
    // Inicialización del formulario con datos pre-cargados
    this.editarForm = this.fb.group({
      id: [data.id],
      fecha: [data.fecha],
      hora: [data.hora],
      id_estado: [data.id_estado],
      id_cliente: [data.id_cliente],
      observaciones: [data.observaciones],
      direccion: [data.direccion],
      id_tipo_entrega: [data.id_tipo_entrega],
      precio_total: [data.precio_total],
    });
  }

  ngOnInit(): void {
    // Aquí se podría cargar lógica adicional si es necesario
  }

  // Método para manejar la acción de guardar
  onSave(): void {
    if (this.editarForm.valid) {
      // Aquí iría la lógica para guardar los datos editados
      // Por ejemplo, podrías enviar los datos a un servicio o emitir un evento
      console.log(this.editarForm.value);  // Temporal para ver los valores del formulario
      this.dialogRef.close(this.editarForm.value);  // Se cierra el modal y se devuelve la data
    }
  }

  // Método para manejar la cancelación
  onCancel(): void {
    this.dialogRef.close();  // Cierra el modal sin guardar
  }
}
