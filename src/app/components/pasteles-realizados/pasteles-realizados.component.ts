import { Component, OnInit } from '@angular/core';
import { pastelrealizado } from 'src/app/models/pastelrealizado.interface';
import { tipoevento } from 'src/app/models/tipoevento.interface';
import { CatalogosService } from 'src/services/catalogos.service';

@Component({
  selector: 'app-pasteles-realizados',
  templateUrl: './pasteles-realizados.component.html',
  styleUrls: ['./pasteles-realizados.component.css']
})
export class PastelesRealizadosComponent implements OnInit {
  pasteles: pastelrealizado[] = []; // Array para las imágenes de pasteles
  paginacion: number = 10; // Número máximo de imágenes por página
  paginaActual: number = 1; // Página actual
  totalPaginas: number; // Total de páginas
  mostrarModal: boolean = false; // Controla la visibilidad del modal
  imagenSeleccionada: string = ''; // Guarda la imagen seleccionada
  tipos: tipoevento[] = [];
  pastelesRealizado: pastelrealizado[] = [];
  eventoSeleccionadoId: string = ''; // ID del evento seleccionado

  constructor(private service: CatalogosService) {
    this.totalPaginas = Math.ceil(this.pasteles.length / this.paginacion);
  }

  ngOnInit(): void {
    this.service.tipoEvento().subscribe((datos: tipoevento[]) => {
      this.tipos = datos;
    });
    this.service.pastelesRealizados().subscribe((datos: pastelrealizado[]) => {
      this.pastelesRealizado = datos;
    });
  }

  filtrarPasteles(event: Event): void {
    const eventoId = Number((event.target as HTMLSelectElement).value); // Convertimos a número
    this.eventoSeleccionadoId = eventoId.toString();
    this.pasteles = this.pastelesRealizado.filter(
      (pastel) => pastel.id_tipo_evento === eventoId
    );
    this.totalPaginas = Math.ceil(this.pasteles.length / this.paginacion);
    this.paginaActual = 1; // Reiniciar a la primera página
  }
  
  obtenerPastelesPorPagina(): pastelrealizado[] {
    const inicio = (this.paginaActual - 1) * this.paginacion;
    return this.pasteles.slice(inicio, inicio + this.paginacion);
  }

  cambiarPagina(pagina: number): void {
    if (pagina > 0 && pagina <= this.totalPaginas) {
      this.paginaActual = pagina;
    }
  }

  abrirModal(imagen: string): void {
    this.imagenSeleccionada = imagen; // Guarda la imagen que se va a mostrar
    this.mostrarModal = true; // Muestra el modal
  }

  cerrarModal(): void {
    this.mostrarModal = false; // Cierra el modal
    this.imagenSeleccionada = ''; // Limpia la imagen seleccionada
  }
}
