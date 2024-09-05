import { Component } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.interface'; 
import { SesionService } from 'src/services/sesion.service'; 
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  showPassword: boolean = false;

  constructor(private sesionService: SesionService, private router: Router) {}

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    const credenciales = {
      correo: this.email,
      contrasenia: this.password
    };

    this.sesionService.sesion(credenciales).subscribe(
      (response: Usuario) => {
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Usuario autenticado correctamente',
          confirmButtonText: 'Aceptar'
        });
        this.router.navigate(['/sisprincipal']);
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error en la autenticación. Por favor, verifica tus credenciales.',
          confirmButtonText: 'Intentar de nuevo'
        });
      }
    );
  }
}

