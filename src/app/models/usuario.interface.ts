export interface Usuario {
    id_usuario?: number;
    id_rol?: number;
    nombre?: string;
    email?: string;
    contrasenia?: string;
    estado?:boolean;
  }
  
  export interface UsuarioCompleto extends Usuario {
    id_usuario?: number;
    id_rol?: number;
    nombre?: string;
    email?: string;
    contrasenia?: string;
    rol?: string;
    estado?:boolean;
  }
 