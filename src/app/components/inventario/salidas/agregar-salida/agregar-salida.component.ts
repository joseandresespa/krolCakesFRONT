import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { salidainventario } from 'src/app/models/salidainventario.interface'; 
import { insumoutensilio } from 'src/app/models/insumoutensilio.interface';
import { MotivoSalida } from 'src/app/models/motivosalida.interface';
import { CatalogosService } from 'src/services/catalogos.service';
import { InventarioService } from 'src/services/inventario.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-agregar-salida',
  templateUrl: './agregar-salida.component.html',
  styleUrls: ['./agregar-salida.component.css']
})
export class AgregarSalidaComponent implements OnInit {

  registroForm: FormGroup;
  motivos: MotivoSalida[] = [];
  listaInsumos: insumoutensilio[] = [];
  totalGeneral: number = 0;

  constructor(
    public dialogRef: MatDialogRef<AgregarSalidaComponent>,
    private fb: FormBuilder,
    private service: CatalogosService,
    private inventarioService: InventarioService
  ) {
    this.registroForm = this.fb.group({
      fecha: [''],
      notas: [''],
      insumos: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.cargarProveedores();
    this.cargarInsumos();
    this.agregarInsumo(); // Para empezar con un insumo por defecto
  }

  cargarProveedores() {
    this.service.tipoSalida().subscribe(data => {
      this.motivos = data;
    });
  }

  cargarInsumos() {
    this.service.insumos().subscribe(data => {
      this.listaInsumos = data;
    });
  }

  get insumos(): FormArray {
    return this.registroForm.get('insumos') as FormArray;
  }

  agregarInsumo() {
    const insumoForm = this.fb.group({
      insumo: [''],
      cantidadActual: [0],
      cantidadSalida: [0],
      motivo: [''],
    });
    this.insumos.push(insumoForm);
  }

  eliminarInsumo(index: number) {
    this.insumos.removeAt(index);
  }

  cerrarModal() {
    this.dialogRef.close();
  }



  guardarRegistro() {
    if (this.registroForm.valid) {
      const compraSalida: salidainventario = {
        fecha: this.registroForm.value.fecha,
        notas: this.registroForm.value.notas,
        detalleSalida: this.insumos.value.map((insumo: { insumo: any; cantidadSalida: any; motivo: any; }) => ({
          id_insumo_utensilio: insumo.insumo,
          cantidad: insumo.cantidadSalida,
          id_motivo_salida: insumo.motivo,
        }))
            };

      console.log(compraSalida);
      
      this.inventarioService.nuevaSalida(compraSalida).subscribe(
        response => {
          console.log('Salida registrada exitosamente:', response);
          this.dialogRef.close();
        },
        error => {
          console.error('Error al registrar la Salida:', error);
          this.dialogRef.close();
        }
      );
    } else {
      console.log('Formulario no válido');
    }
  }

  actualizarCantidadActual(index: number) {
    // Obtener el ID del insumo seleccionado
    const insumoId = this.insumos.at(index).get('insumo')?.value;

    // Buscar el insumo en listaInsumos
    const insumoSeleccionado = this.listaInsumos.find(insumo => insumo.id == insumoId);

    // Comprobar que insumoSeleccionado existe y tiene la propiedad cantidad
    if (insumoSeleccionado) {
        console.log('Insumo seleccionado:', insumoSeleccionado); // Debug
        this.insumos.at(index).patchValue({ cantidadActual: insumoSeleccionado.cantidad });
    } else {
        console.log('Insumo no encontrado para ID:', insumoId); // Debug
    }
}


validarCantidadSalida(index: number) {
    const cantidadActual = this.insumos.at(index).get('cantidadActual')?.value || 0;
    const cantidadSalida = this.insumos.at(index).get('cantidadSalida')?.value || 0;

    if (cantidadSalida > cantidadActual) {
        // Aquí podrías mostrar un mensaje de error o realizar otra acción
        alert(`No puedes ingresar una cantidad mayor a la cantidad actual (${cantidadActual}).`);
        this.insumos.at(index).get('cantidadSalida')?.setValue(cantidadActual); // Restablece a la cantidad actual si es mayor
    }
}


}
