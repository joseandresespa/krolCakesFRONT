import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { estado } from 'src/app/models/estado.interface';
import { CatalogosService } from 'src/services/catalogos.service';
import { CotizacionPedidosService } from 'src/services/cotizacion-pedidos.service';

@Component({
  selector: 'app-modal-estado-pedido',
  templateUrl: './modal-estado-pedido.component.html',
  styleUrls: ['./modal-estado-pedido.component.css']
})
export class ModalEstadoPedidoComponent implements OnInit {
  nuevoEstado: number | undefined; // Permitir que sea undefined inicialmente
  estados: estado[] = []; 
  estadosFiltrados: estado[] = []; // Propiedad para estados filtrados
  idPedido: number | undefined;

  constructor(
    public dialogRef: MatDialogRef<ModalEstadoPedidoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { estado: number, id_pedido: number },
    private service: CatalogosService,
    private servicePedido: CotizacionPedidosService
  ) {
    // Inicializar el estado actual
    this.nuevoEstado = data.estado; // Asignar el estado actual al nuevo estado
    this.idPedido = data.id_pedido;
  }

  ngOnInit(): void {
    this.service.estado().subscribe((estado: estado[]) => {
      this.estados = estado; // Cargar los estados disponibles
      this.filtrarEstados(); // Filtrar estados después de cargarlos
    });
  }

  // Método para filtrar los estados cuyo ID sea diferente de 10
  filtrarEstados() {
    this.estadosFiltrados = this.estados.filter(estado => estado.id !== 10);
  }

  // Método para confirmar el cambio de estado
  onConfirm(): void {
    // Verificar si nuevoEstado tiene un valor válido antes de cerrar
    if (this.nuevoEstado !== undefined && this.idPedido !== undefined) {
      this.servicePedido.cambioEstadoPedido(this.idPedido, this.nuevoEstado).subscribe(
        response => {
          console.log('Estado del pedido actualizado exitosamente:', response);
        },
        error => {
          console.error('Error al actualizar el estado del pedido:', error);
        }
      );
      this.dialogRef.close(); // Cerrar el modal y enviar el nuevo estado
    } else {
      console.error('Nuevo estado no definido');
    }
    this.dialogRef.close();
  }

  // Método para cancelar
  onCancel(): void {
    this.dialogRef.close(); // Cerrar el modal sin enviar datos
  }
}
