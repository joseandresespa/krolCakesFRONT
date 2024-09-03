import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { rol } from 'src/app/models/rol.interface';
import { CatalogosService } from 'src/services/catalogos.service'; 

@Component({
  selector: 'app-editar-usuario-dialog',
  templateUrl: './editar-usuario-dialog.component.html',
  styleUrls: ['./editar-usuario-dialog.component.css']
})
export class EditarUsuarioDialogComponent implements OnInit {
  roles: rol[] = [];  
  constructor(
    public dialogRef: MatDialogRef<EditarUsuarioDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: CatalogosService
  ) {}

  ngOnInit(): void {
    this.service.roles().subscribe((data) => {
      this.roles = data;
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.service.ActualizarUsuario(this.data).subscribe(
      response => {
        // Aqui podes meterle una libreria de alertas y 
        //lo que tiene la variable response es lo que responde el back
        console.log(response);
        this.dialogRef.close(this.data);
      },
      error => {
        // igual aqui solo que es la variable error la que trae la respuesta. 
        //ojo solo para estos servicios, por que hay algunos que devuelven objetos
        //siempre te voy a dejar un mensaje de cuales pueden ser
        console.error(error);
      }
    );
  }


}

  
