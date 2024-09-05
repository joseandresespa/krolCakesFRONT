import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sistema',
  templateUrl: './sistema.component.html',
  styleUrls: ['./sistema.component.css']
})
export class SistemaComponent implements OnInit {

  private openDropdown: string | null = null;

  constructor(private router: Router) { }

  navigateTo(url: string): void {
    this.router.navigateByUrl(url);
  }

  ngOnInit(): void {
    // Se puede inicializar alguna lógica si es necesario
  }

  toggleDropdown(dropdown: string) {
    this.openDropdown = this.openDropdown === dropdown ? null : dropdown;
  }

  isDropdownOpen(dropdown: string): boolean {
    return this.openDropdown === dropdown;
  }

  onLogout() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¿Deseas salir del sistema?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e53935',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, salir',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/login']); // Redirige a la página de login u otra que desees
      }
    });
  }
}
