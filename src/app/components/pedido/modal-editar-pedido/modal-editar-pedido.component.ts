import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { pedido } from 'src/app/models/pedido.interface';

@Component({
  selector: 'app-modal-editar-pedido',
  templateUrl: './modal-editar-pedido.component.html',
  styleUrls: ['./modal-editar-pedido.component.css']
})
export class ModalEditarPedidoComponent implements OnInit {
  pedidoForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ModalEditarPedidoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: pedido
  ) {}

  ngOnInit(): void {
    this.pedidoForm = this.fb.group({
      fecha: [this.data.fecha ? new Date(this.data.fecha) : new Date(), Validators.required],
      hora: [this.data.hora, Validators.required],
      id_estado: [this.data.id_estado, Validators.required],
      id_cliente: [this.data.cliente_id, Validators.required],
      observaciones: [this.data.observaciones],
      direccion: [this.data.direccion, Validators.required],
      id_tipo_entrega: [this.data.envio, Validators.required],
      precio_total: [this.data.precio_aproximado, Validators.required],
    });
  }

  onSubmit(): void {
    if (this.pedidoForm.valid) {
      this.dialogRef.close(this.pedidoForm.value); // Retornar los cambios al componente padre
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
