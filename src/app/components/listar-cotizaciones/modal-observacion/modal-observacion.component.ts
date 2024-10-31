import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { cotizaciononline } from 'src/app/models/cotizaciononline.interface';
import { CotizacionPedidosService } from 'src/services/cotizacion-pedidos.service';

@Component({
  selector: 'app-modal-observacion',
  templateUrl: './modal-observacion.component.html',
  styleUrls: ['./modal-observacion.component.css']
})
export class ModalObservacionComponent {
  observacion: string = ''; // Observación del input
  imagenesSubidas: File[] = []; // Guardar archivos de imágenes, no en base64

  constructor(
    public dialogRef: MatDialogRef<ModalObservacionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: cotizaciononline,
    private service: CotizacionPedidosService // Inyectar el servicio para enviar la solicitud HTTP
  ) {}

  // Manejar la subida de imágenes
  onImageUpload(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.imagenesSubidas = Array.from(input.files); // Guardar las imágenes como File[]
    }
  }

  // Cerrar el diálogo sin guardar
  onNoClick(): void {
    this.dialogRef.close();
  }

  // Confirmar observación y enviar datos
  confirmObservation(): void {
      // Crear el objeto con las imágenes, la observación y el ID de la cotización
      const datos = {
        id_cotizacion_online: this.data.id, // ID recibido desde MAT_DIALOG_DATA
        observacion: this.observacion, // La observación en texto
        imagenes: this.imagenesSubidas // Array de imágenes tipo File[]
      };

      // Enviar los datos a través del servicio
      this.service.InsertarImagenObs(datos).subscribe(
        (response) => {
          console.log('Datos enviados correctamente:', response);
          this.dialogRef.close(response); // Cerrar el modal tras la respuesta del servidor
        },
        (error) => {
          console.error('Error al enviar los datos:', error);
           this.dialogRef.close();
        }
      );
    
  }
}
