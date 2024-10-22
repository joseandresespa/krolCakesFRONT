import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { tipoinsumoutensilio } from 'src/app/models/tipoinsumoutensilio.interface';
import { unidadmedida } from 'src/app/models/unidadmedida.interface';
import { CatalogosService } from 'src/services/catalogos.service';
import { insumoutensilio } from 'src/app/models/insumoutensilio.interface'; // Asegúrate de importar la interfaz

@Component({
  selector: 'app-modal-agregar-insumo',
  templateUrl: './modal-agregar-insumo.component.html',
  styleUrls: ['./modal-agregar-insumo.component.css']
})
export class ModalAgregarInsumoComponent implements OnInit {
  tiposInsumo: tipoinsumoutensilio[] = [];
  unidadesMedida: unidadmedida[] = [];

  selectedTipoInsumo: number | undefined; 
  selectedUnidadMedida: number | undefined; 
  nombre: string = ''; 
  precioUnitario: number | undefined; 
  cantidad: number | undefined; 
  inventarioRenovable: boolean = false; 
  fechaIngreso: Date | undefined; // Nueva propiedad para la fecha de ingreso
  fechaVencimiento: Date | undefined; // Nueva propiedad para la fecha de vencimiento

  constructor(public dialogRef: MatDialogRef<ModalAgregarInsumoComponent>, private service: CatalogosService) {}

  ngOnInit(): void {
    this.service.tipoInsumoUtensilio().subscribe({
      next: (tipos) => this.tiposInsumo = tipos,
      error: (err) => console.error('Error al cargar tipos de insumo:', err)
    });
    
    this.service.unidadesCosto().subscribe({
      next: (unidades) => this.unidadesMedida = unidades,
      error: (err) => console.error('Error al cargar unidades de medida:', err)
    });
  }

  close(): void {
    this.dialogRef.close();
  }

  saveInsumo(): void {
    const insumoData: insumoutensilio = {
      id_tipo_insumo: this.selectedTipoInsumo,
      nombre: this.nombre,
      id_unidad_medida: this.selectedUnidadMedida,
      precio_unitario: this.precioUnitario,
      cantidad: this.cantidad,
      inventarioRenovable: this.inventarioRenovable,
      fecha_ingreso: this.fechaIngreso, 
      fecha_vencimiento: this.fechaVencimiento 
    };
  
    console.log('Insumo guardado', insumoData); // Verifica aquí
    this.dialogRef.close(insumoData); 
  }
  
}
