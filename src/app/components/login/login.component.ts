import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  showPassword: boolean = false; // Inicializa la propiedad showPassword

  // Método para alternar la visibilidad de la contraseña
  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    // Lógica para manejar el envío del formulario
    console.log('Email:', this.email);
    console.log('Password:', this.password);
  }
}
