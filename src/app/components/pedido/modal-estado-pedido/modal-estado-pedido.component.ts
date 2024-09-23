import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-estado-pedido',
  templateUrl: './modal-estado-pedido.component.html',
  styleUrls: ['./modal-estado-pedido.component.css']
})
export class ModalEstadoPedidoComponent {
  nuevoEstado: number;

  constructor(
    public dialogRef: MatDialogRef<ModalEstadoPedidoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { estado: number }
  ) {
    // Inicializar el estado actual
    this.nuevoEstado = data.estado;
  }

  // Método para confirmar el cambio de estado
  onConfirm(): void {
    this.dialogRef.close(this.nuevoEstado);
  }

  // Método para cancelar
  onCancel(): void {
    this.dialogRef.close();
  }
}
