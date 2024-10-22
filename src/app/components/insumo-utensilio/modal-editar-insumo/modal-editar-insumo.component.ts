import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { tipoinsumoutensilio } from 'src/app/models/tipoinsumoutensilio.interface';
import { unidadmedida } from 'src/app/models/unidadmedida.interface';
import { CatalogosService } from 'src/services/catalogos.service';

@Component({
  selector: 'app-modal-editar-insumo',
  templateUrl: './modal-editar-insumo.component.html',
  styleUrls: ['./modal-editar-insumo.component.css']
})
export class ModalEditarInsumoComponent implements OnInit {
  tiposInsumo: tipoinsumoutensilio[] = [];
  unidadesMedida: unidadmedida[] = [];

  constructor(
    public dialogRef: MatDialogRef<ModalEditarInsumoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private catalogosService: CatalogosService
  ) {}

  ngOnInit(): void {
    // Cargar los tipos de insumo y unidades de medida
    this.catalogosService.tipoInsumoUtensilio().subscribe(tipos => this.tiposInsumo = tipos);
    this.catalogosService.unidadesCosto().subscribe(unidades => this.unidadesMedida = unidades);
  }

  // Método para cerrar el modal
  close(): void {
    this.dialogRef.close();
  }

  // Método para guardar el insumo
  saveInsumo(): void {
    console.log('Insumo editado:', this.data);
    this.dialogRef.close(this.data); // Cierra el modal después de guardar y devuelve los datos
  }
}
