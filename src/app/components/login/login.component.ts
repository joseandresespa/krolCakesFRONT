import { Component } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.interface'; 
import { SesionService } from 'src/services/sesion.service'; 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  showPassword: boolean = false; // Inicializa la propiedad showPassword

  constructor(private sesionService: SesionService) {}

  // Método para alternar la visibilidad de la contraseña
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
        alert('Usuario autenticado: '+ response);
        // Aquí puedes redirigir al usuario a otra página o guardar su información en localStorage
      },
      (error) => {
        console.error('Error en la autenticación: '+ error);
        // Aquí puedes mostrar un mensaje de error al usuario
      }
    );
  }
}
