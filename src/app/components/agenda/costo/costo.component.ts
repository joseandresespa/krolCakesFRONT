import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CotizacionPedidosService } from 'src/services/cotizacion-pedidos.service';
import { CatalogosService } from 'src/services/catalogos.service';
import { pedido } from 'src/app/models/pedido.interface';
import { costo } from 'src/app/models/costo.interface';
import { detallecosto } from 'src/app/models/detallecosto.interface';
import { insumoutensilio } from 'src/app/models/insumoutensilio.interface';
import { unidadmedida } from 'src/app/models/unidadmedida.interface';
import { tipoevento } from 'src/app/models/tipoevento.interface';

@Component({
  selector: 'app-costo',
  templateUrl: './costo.component.html',
  styleUrls: ['./costo.component.css']
})
export class CostoComponent implements OnInit {
  pedido: pedido | null = null;
  pedidoId: string | null = null;
  insumosUtensilios: insumoutensilio[] = [];
  unidades: unidadmedida[] = [];
  eventos: tipoevento[] = [];
  productos = [
    { unidad: '', insumo: '', cantidad: 1, precio_unitario: 0, subtotal: 0 }
  ];
  imagenes: File[] = []; // Cambiado a File[]
  ganancia: number = 0;
  tipoEventoSeleccionado: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private service: CotizacionPedidosService,
    private serviceCatalogos: CatalogosService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.pedidoId = params.get('pedidoId');
      if (this.pedidoId) {
        this.obtenerPedido(this.pedidoId);
      }
    });

    this.cargarDatosCatalogos();
  }

  cargarDatosCatalogos(): void {
    this.serviceCatalogos.insumos().subscribe((insumos: insumoutensilio[]) => {
      this.insumosUtensilios = insumos;
    });

    this.serviceCatalogos.unidadesCosto().subscribe((unidades: unidadmedida[]) => {
      this.unidades = unidades;
    });

    this.serviceCatalogos.tipoEvento().subscribe((evento: tipoevento[]) => {
      this.eventos = evento;
    });
  }

  obtenerPedido(pedidoId: string): void {
    const idAsNumber = Number(pedidoId);
    this.service.pedidos().subscribe({
      next: (pedidos: pedido[]) => {
        this.pedido = pedidos.find(p => p.id === idAsNumber) || null;
        this.calcularGanancia();
      },
      error: (error) => {
        console.error('Error al obtener los pedidos:', error);
      }
    });
  }

  agregarProducto() {
    this.productos.push({ unidad: '', insumo: '', cantidad: 1, precio_unitario: 0, subtotal: 0 });
  }

  eliminarProducto(index: number) {
    this.productos.splice(index, 1);
    this.calcularGanancia();
  }

  actualizarSubtotal(producto: any) {
    producto.subtotal = producto.cantidad * producto.precio_unitario;
    this.calcularGanancia();
  }

  calcularTotalGeneral() {
    return this.productos.reduce((total, producto) => total + producto.subtotal, 0);
  }

  calcularGanancia() {
    const costoGeneral = this.calcularTotalGeneral();
    this.ganancia = (this.pedido?.total_presupuesto || 0) - costoGeneral;
  }

  // Manejar la subida de imágenes
  onImageUpload(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.imagenes = Array.from(input.files); // Guardar como File[]
    }
  }

  eliminarImagen(index: number): void {
    this.imagenes.splice(index, 1);
  }

  enviarCosto() {
    const detalle: detallecosto[] = this.productos.map(producto => ({
      id_insumo_utensilio: Number(producto.insumo),
      cantidad: producto.cantidad,
      id_unidad_medida: Number(producto.unidad)
    }));

    const formData = new FormData();

    // Serializar los datos de costo y detalles en un objeto
    const costoData = {
      id_pedido: this.pedido?.id?.toString() || '',
      costo: this.calcularTotalGeneral().toString(),
      ganancia: this.ganancia.toString(),
      detalles: detalle, // Asegurarse de que el detalle esté correctamente estructurado
      id_tipo_pedido: this.tipoEventoSeleccionado?.toString() || '1'
    };

    // Agregar el JSON serializado
    formData.append('costoJSON', JSON.stringify(costoData)); // Aquí es importante que el nombre sea 'nuevoPedidoJSON'

    // Agregar las imágenes al FormData
    this.imagenes.forEach((imagen: File) => {
      formData.append('imagenes', imagen);
    });

    console.log

    // Enviar la solicitud al backend
    this.service.enviarCosto(formData).subscribe({
      next: (response) => {
        console.log('Costo enviado exitosamente', response);
      },
      error: (error) => {
        console.error('Error al enviar el costo', error);
      }
    });
    this.router.navigate(['/pedido']);
}

}
