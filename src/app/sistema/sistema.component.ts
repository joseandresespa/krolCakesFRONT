import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sistema',
  templateUrl: './sistema.component.html',
  styleUrls: ['./sistema.component.css']
})
export class SistemaComponent implements OnInit {

  private openDropdown: string | null = null;

  constructor() { }

  ngOnInit(): void {
    // Puedes inicializar alguna lógica si es necesario
  }

  toggleDropdown(dropdown: string) {
    this.openDropdown = this.openDropdown === dropdown ? null : dropdown;
  }

  isDropdownOpen(dropdown: string): boolean {
    return this.openDropdown === dropdown;
  }
}
