import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CotizacionPedidosService } from 'src/services/cotizacion-pedidos.service';
import { CatalogosService } from 'src/services/catalogos.service';
import { pedido } from 'src/app/models/pedido.interface';
import { costo } from 'src/app/models/costo.interface';
import { detallecosto } from 'src/app/models/detallecosto.interface';
import { pastelrealizado } from 'src/app/models/pastelrealizado.interface';
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
  imagenesSubidas: string[] = [];
  ganancia: number = 0;  
  tipoEventoSeleccionado: number | null = null;  // Nueva propiedad para el ID del tipo de evento

  constructor(
    private route: ActivatedRoute,
    private service: CotizacionPedidosService,
    private serviceCatalogos: CatalogosService
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

  onImageUpload(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      const archivos = Array.from(input.files);
      archivos.forEach((archivo) => {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.imagenesSubidas.push(e.target.result);
        };
        reader.readAsDataURL(archivo);
      });
    }
  }

  eliminarImagen(index: number): void {
    this.imagenesSubidas.splice(index, 1);
  }

  enviarCosto() {
    const detalle: detallecosto[] = this.productos.map(producto => ({
        id_insumo_utensilio: Number(producto.insumo),
        cantidad: producto.cantidad,
        id_unidad_medida: Number(producto.unidad)
    }));

    const imagenesRealizado: pastelrealizado[] = this.imagenesSubidas.map(img => ({
        imagen: img,
        id_tipo_evento: this.tipoEventoSeleccionado !== null ? this.tipoEventoSeleccionado : undefined 
    }));

    const costoData: costo = {
        id_pedido: this.pedido ? this.pedido.id : undefined,
        costo: this.calcularTotalGeneral(),
        ganancia: this.ganancia,
        detalle,
        imagenesRealizado
    };

    this.service.enviarCosto(costoData).subscribe({
        next: (response) => {
            console.log('Costo enviado exitosamente', costoData);
        },
        error: (error) => {
            console.error('Error al enviar el costo', costoData);
        }
    });
  }
}
