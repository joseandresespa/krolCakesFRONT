import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { comprainventario } from 'src/app/models/comprainventario.interface';
import { insumoutensilio } from 'src/app/models/insumoutensilio.interface';
import { proveedor } from 'src/app/models/proveedor.interface';
import { CatalogosService } from 'src/services/catalogos.service';
import { InventarioService } from 'src/services/inventario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-compras',
  templateUrl: './agregar-compras.component.html',
  styleUrls: ['./agregar-compras.component.css']
})
export class AgregarComprasComponent implements OnInit {

  registroForm: FormGroup;
  proveedores: proveedor[] = [];
  listaInsumos: insumoutensilio[] = [];
  totalGeneral: number = 0;

  constructor(
    private fb: FormBuilder,
    private service: CatalogosService,
    private inventarioService: InventarioService
  ) {
    this.registroForm = this.fb.group({
      fecha: [''],
      proveedor: [''],
      insumos: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.cargarProveedores();
    this.cargarInsumos();
    this.agregarInsumo(); // Para empezar con un insumo por defecto
  }

  cargarProveedores() {
    this.service.proveedores().subscribe(data => {
      this.proveedores = data;
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
      cantidad: [0],
      precioCompra: [0],
      subtotal: [0]
    });
    this.insumos.push(insumoForm);
  }

  eliminarInsumo(index: number) {
    this.insumos.removeAt(index);
    this.calcularTotalGeneral();
  }

  calcularSubtotal(index: number) {
    const insumo = this.insumos.at(index);
    const cantidad = insumo.get('cantidad')?.value || 0;
    const precioCompra = insumo.get('precioCompra')?.value || 0;
    const subtotal = cantidad * precioCompra;
    insumo.get('subtotal')?.setValue(subtotal);
    this.calcularTotalGeneral();
  }

  calcularTotalGeneral() {
    this.totalGeneral = this.insumos.controls.reduce((total, insumo) => {
      return total + (insumo.get('subtotal')?.value || 0);
    }, 0);
  }

  cerrarModal() {
    // lógica para cerrar el modal
  }

  guardarRegistro() {
    if (this.registroForm.valid) {
        const compraData: comprainventario = {
            fecha_compra: this.registroForm.value.fecha,
            id_proveedor: this.registroForm.value.proveedor,
            detalleCompra: this.insumos.value.map((insumo: { insumo: any; cantidad: any; precioCompra: any; subtotal: any; }) => ({
                id_insumo_utensilio: insumo.insumo,
                cantidad: insumo.cantidad,
                precio_unitario: insumo.precioCompra,
                subtotal: insumo.subtotal
            })),
            total: this.totalGeneral // Asigna el total general
        };

        console.log(compraData);
        // Llama al servicio para enviar la nueva compra
        this.inventarioService.nuevaCompra(compraData).subscribe(
            response => {
                console.log('Compra registrada exitosamente:', response);
                
                // Muestra el modal de éxito con SweetAlert2
                Swal.fire({
                    title: '¡Éxito!',
                    text: 'Compra registrada exitosamente.',
                    icon: 'success',
                    confirmButtonText: 'Aceptar'
                }).then(() => {
                    this.cerrarModal(); // Cierra el modal o realiza otra acción
                });
            },
            error => {
              
                console.log('Compra registrada exitosamente:', error);
                
                // Muestra el modal de éxito con SweetAlert2
                Swal.fire({
                    title: '¡Éxito!',
                    text: 'Compra registrada exitosamente.',
                    icon: 'success',
                    confirmButtonText: 'Aceptar'
                }).then(() => {
                    this.cerrarModal(); // Cierra el modal o realiza otra acción
                });
            }
        );
    } else {
        console.log('Formulario no válido');
    }
}
}
