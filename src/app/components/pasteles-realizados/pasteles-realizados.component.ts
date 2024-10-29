import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pasteles-realizados',
  templateUrl: './pasteles-realizados.component.html',
  styleUrls: ['./pasteles-realizados.component.css']
})
export class PastelesRealizadosComponent implements OnInit {
  pasteles: string[] = []; // Array para las imágenes de pasteles
  paginacion: number = 10; // Número máximo de imágenes por página
  paginaActual: number = 1; // Página actual
  totalPaginas: number; // Total de páginas
  mostrarModal: boolean = false; // Controla la visibilidad del modal
  imagenSeleccionada: string = ''; // Guarda la imagen seleccionada

  constructor() {
    this.pasteles = []; //Array vacio
    this.totalPaginas = Math.ceil(this.pasteles.length / this.paginacion);
  }

  ngOnInit(): void {}

  obtenerPastelesPorPagina(): string[] {
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
