import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CotizacionPedidosService } from 'src/services/cotizacion-pedidos.service';
import { pedido } from 'src/app/models/pedido.interface';
import { CatalogosService } from 'src/services/catalogos.service';

@Component({
  selector: 'app-costo',
  templateUrl: './costo.component.html',
  styleUrls: ['./costo.component.css']
})
export class CostoComponent implements OnInit {
  pedido: pedido | null = null;
  pedidoId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private service: CotizacionPedidosService,
    private serviceCatalogos: CatalogosService
  ) {}

  ngOnInit(): void {
    // Capturar el 'pedidoId' de los parámetros de la URL
    this.route.queryParamMap.subscribe(params => {
      this.pedidoId = params.get('pedidoId');
      if (this.pedidoId) {
        this.obtenerPedido(this.pedidoId);
      }
    });

  }

  obtenerPedido(pedidoId: string): void {
    // Convert 'pedidoId' to a number for comparison
    const idAsNumber = Number(pedidoId);
  
    // Obtener todos los pedidos y filtrar el que coincida con el 'pedidoId'
    this.service.pedidos().subscribe({
      next: (pedidos: pedido[]) => {
        // Filtrar el pedido específico
        this.pedido = pedidos.find(p => p.id === idAsNumber) || null;
        if (this.pedido) {
          console.log('Pedido encontrado:', this.pedido);
        } else {
          console.log('No se encontró un pedido con el ID proporcionado.');
        }
      },
      error: (error) => {
        console.error('Error al obtener los pedidos:', error);
      }
    });
  }

  unidadesDeMedida: string[] = ['kg', 'g', 'litros', 'unidades'];
  insumos: string[] = ['Azúcar', 'Sal', 'Aceite', 'Arroz'];
  
  productos = [
    { unidad: '', insumo: '', cantidad: 1, precio_unitario: 0, subtotal: 0 }
  ];

  imagenesSubidas: string[] = [];

  agregarProducto() {
    this.productos.push({ unidad: '', insumo: '', cantidad: 1, precio_unitario: 0, subtotal: 0 });
  }

  eliminarProducto(index: number) {
    this.productos.splice(index, 1);
  }

  actualizarSubtotal(producto: any) {
    producto.subtotal = producto.cantidad * producto.precio_unitario;
  }

  calcularTotalGeneral() {
    return this.productos.reduce((total, producto) => total + producto.subtotal, 0);
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
  
}
