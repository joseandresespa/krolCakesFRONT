import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CatalogosService } from 'src/services/catalogos.service'; // Importa el servicio
import { cotizaciononline } from 'src/app/models/cotizaciononline.interface';
import { producto } from 'src/app/models/producto.interface'; // Asegúrate de tener esta interfaz

@Component({
  selector: 'app-modal-cotizacion',
  templateUrl: './modal-cotizacion.component.html',
  styleUrls: ['./modal-cotizacion.component.css']
})
export class ModalCotizacionComponent implements OnInit {
  productos: producto[] = [];

  constructor(
    public dialogRef: MatDialogRef<ModalCotizacionComponent>,
    @Inject(MAT_DIALOG_DATA) public cotizacion: cotizaciononline,
    private catalogosService: CatalogosService // Inyecta el servicio
  ) {}

  ngOnInit(): void {
    this.loadProductos();
    console.log(this.cotizacion);
  }

  loadProductos(): void {
    this.catalogosService.productos().subscribe(data => {
      this.productos = data;
    });
  }

  getNombreProducto(id: number): string {
    const producto = this.productos.find(p => p.id === id);
    return producto?.nombre ?? 'Producto no encontrado'; // Usa el operador de coalescencia nula
  }
  
  

  close(): void {
    this.dialogRef.close();
  }
}
